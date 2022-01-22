import { Plugin } from '@nuxt/types'
import {
  BlockBlobClient,
  AnonymousCredential,
  BaseRequestPolicy,
  newPipeline
} from '@azure/storage-blob'
import { RequestPolicy, RequestPolicyOptionsLike } from '@azure/core-http/types/latest/src/policies/requestPolicy'
import { WebResourceLike } from '@azure/core-http/types/latest/src/webResource'

type AttachmentHandler = {
  process(file: any, callback: (x:number)=> void): Promise<void>
}

declare module 'vue/types/vue' {
  interface Vue {
    $attachments: AttachmentHandler
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $attachments: AttachmentHandler
  }
}

type Store = {
  [key: string]: string | undefined
}

const attachments: Plugin = ({ app }, inject) => {
  class SasStore {
    private sasCache: Store = {}

    // Get a valid SAS for blob
    async getValidSASForBlob (blobURL: string) {
      const cacheElement = this.sasCache[blobURL]
      if (cacheElement && this.isSasStillValidInNext2Mins(cacheElement)) {
        return cacheElement
      } else {
        return (this.sasCache[blobURL] = await this.getNewSasForBlob(blobURL))
      }
    }

    // Return true if "se" section in SAS is still valid in next 2 mins
    isSasStillValidInNext2Mins (sas: string) {
      const expiryStringInSas = new URL(`http://hostname${sas}`).searchParams.get('se')
      return new Date(expiryStringInSas || 0).getTime() - Date.now() >= 2 * 60 * 1000
    }

    // Get a new SAS for blob, we assume a SAS starts with a "?"
    async getNewSasForBlob (blobURL: string) {
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
    private sasStore: SasStore

    constructor (sasStore: SasStore) {
      this.sasStore = sasStore
    }

    create (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) {
      return new SasUpdatePolicy(nextPolicy, options, this.sasStore)
    }
  }

  class SasUpdatePolicy extends BaseRequestPolicy {
    private sasStore: SasStore
    constructor (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike, sasStore: SasStore) {
      super(nextPolicy, options)
      this.sasStore = sasStore
    }

    async sendRequest (request: WebResourceLike) {
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
    async process (file: any, callback: (x:number)=> void) {
      const name = file.name
      const fileContent = file.content
      const attachmentsResponse = await app.$services.attachments.post(name, fileContent.name, fileContent.size)
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

export default attachments
