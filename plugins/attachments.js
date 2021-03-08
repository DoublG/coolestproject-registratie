
import {
  BlockBlobClient,
  AnonymousCredential,
  BaseRequestPolicy,
  newPipeline
} from '@azure/storage-blob'

export default ({ app, store, redirect }, inject) => {
  class SasStore {
    constructor () {
      this.sasCache = {}
    }

    // Get a valid SAS for blob
    async getValidSASForBlob (blobURL) {
      if (this.sasCache[blobURL] && this.isSasStillValidInNext2Mins(this.sasCache[blobURL])) {
        return this.sasCache[blobURL]
      } else {
        return (this.sasCache[blobURL] = await this.getNewSasForBlob(blobURL))
      }
    }

    // Return true if "se" section in SAS is still valid in next 2 mins
    isSasStillValidInNext2Mins (sas) {
      const expiryStringInSas = new URL(`http://hostname${sas}`).searchParams.get('se')
      return new Date(expiryStringInSas) - new Date() >= 2 * 60 * 1000
    }

    // Get a new SAS for blob, we assume a SAS starts with a "?"
    async getNewSasForBlob (blobURL) {
      // we need the filename on the backend
      const parts = blobURL.split('?')[0].split('/')
      const name = parts[parts.length - 1]
      const attachmentsResponse = await app.$services.attachments.post_sas(name)
      if (attachmentsResponse === null) {
        return
      }
      return '?' + attachmentsResponse.url.split('?')[1]
    }
  }

  class SasUpdatePolicyFactory {
    constructor (sasStore) {
      this.sasStore = sasStore
    }

    create (nextPolicy, options) {
      return new SasUpdatePolicy(nextPolicy, options, this.sasStore)
    }
  }

  class SasUpdatePolicy extends BaseRequestPolicy {
    constructor (nextPolicy, options, sasStore) {
      super(nextPolicy, options)
      this.sasStore = sasStore
    }

    async sendRequest (request) {
      const urlObj = new URL(request.url)
      const sas = await this.sasStore.getValidSASForBlob(`${urlObj.origin}${urlObj.pathname}`)
      new URL(`http://hostname${sas}`).searchParams.forEach((value, key) => {
        urlObj.searchParams.set(key, value)
      })

      // Update request URL with latest SAS
      request.url = urlObj.toString()

      return this._nextPolicy.sendRequest(request)
    }
  }

  class AttachmentHandler {
    async process (file, callback) {
      const name = file.name
      const fileContent = file.content
      const attachmentsResponse = await app.$services.attachments.post(name, fileContent.size)
      if (attachmentsResponse === null) {
        return
      }
      const azureURL = attachmentsResponse.url

      const sasStore = new SasStore()

      const pipeline = newPipeline(new AnonymousCredential())
      // Inject SAS update policy factory into current pipeline
      pipeline.factories.unshift(new SasUpdatePolicyFactory(sasStore))

      const blockBlobClient = new BlockBlobClient(
        `${azureURL}${await sasStore.getValidSASForBlob(azureURL)}`,
        pipeline
      )

      await blockBlobClient.uploadData(fileContent, {
        maxSingleShotSize: 4 * 1024 * 1024,
        onProgress: ({ loadedBytes }) => {
          const percent = Math.round(100 * (loadedBytes / fileContent.size))
          callback(percent)
        }
      })
    }
  }

  inject('attachments', new AttachmentHandler())
}
