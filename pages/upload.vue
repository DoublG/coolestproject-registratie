<template>
  <b-row>
    <b-col>
      <h1>
        {{ $t('Upload Movie') }}
      </h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-overlay :show="show">
          <b-form @submit.prevent="passes(onUpload)" @reset.prevent="onReset">
            <upload-attachments v-model="file" />
            <b-button
              class="button-hero"
              type="submit"
              :disabled="uploadInProgress"
            >
              <font-awesome-icon :icon="['fas', 'plus']" />  {{ $t('Upload Movie') }}
            </b-button>
          </b-form>
          <template #overlay>
            <div style="width:500px">
              <b-progress :value="percent" max="100" show-progress animated />
            </div>
          </template>
        </b-overlay>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>

<script lang="ts">
// project.own_project.attachments
import { ValidationObserver } from 'vee-validate'
import Vue from 'vue'
import { Settings } from '~/api'

interface IData {
  uploadInProgress: boolean,
  percent: number,
  file: any,
  settings: Settings
}
interface IMethods {}
interface IComputed {}
interface IProps {}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  components: {
    ValidationObserver
  },
  middleware: ['authenticated', 'guard'],
  async asyncData ({ app }) {
    const settings = await app.$http.settings.fetch()
    const project = await app.$services.projectinfo.get()
    if (project === '') {
      app.router?.push(app.localePath('no_project'))
    }
    return {
      project,
      settings,
      readWrite: true
    }
  },
  data () {
    return {
      percent: 0,
      uploadInProgress: false,
      file: null,
      readWrite: false,
      project: null,
      settings: {} as Settings
    }
  },
  computed: {
    show () {
      return this.uploadInProgress || (this.percent > 0 && this.percent < 100)
    }
  },
  methods: {
    async onUpload (_: any) {
      if (this.file!.content.size > (this.settings.maxUploadSize || 0)) {
        alert('file is to big')
        return
      }
      this.uploadInProgress = true
      this.$bus.$emit('block-navigation', this.uploadInProgress)
      await this.$attachments.process(this.file, (percent: number) => { this.percent = percent })
      this.uploadInProgress = false
      this.$bus.$emit('block-navigation', this.uploadInProgress)
      this.$router.push(this.localePath('project'))
    }
  }
})
</script>

<style>
</style>
