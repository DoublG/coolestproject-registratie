<template>
  <b-row>
    <b-col>
      <h1>
        {{ $t('Upload Movie') }}
      </h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-overlay :show="show" rounded="sm">
          <b-form @submit.prevent="passes(onUpload)" @reset.prevent="onReset">
            <upload-attachement v-model="file" />
            <b-button
              class="button-hero"
              type="submit"
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
<script>
// project.own_project.attachments
import { ValidationObserver } from 'vee-validate'
export default {
  middleware: 'authenticated',
  components: {
    ValidationObserver
  },
  async asyncData ({ store, query, app, redirect, route }) {
    const project = await app.$services.projectinfo.get()
    if (project === '') {
      app.router.push(app.localePath('no_project'))
    }
    return {
      project,
      readWrite: true
    }
  },
  data () {
    return {
      percent: 0,
      file: null,
      readWrite: false,
      project: null
    }
  },
  computed: {
    show () {
      return this.percent > 0 && this.percent < 100
    }
  },
  methods: {
    async onUpload (evt) {
      const azureURL = await this.$services.attachments.post(this.file.name)
      await this.$attachments.process(azureURL.url, this.file.content, (percent) => { this.percent = percent })
    },
    async onReset (evt) {

    }
  }
}
</script>

<style>
</style>
