<template>
  <b-row>
    <b-col>
      <h1>{{ $t('CreateViaToken') }}</h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onTokenSubmit)" @reset.prevent="onTokenReset">
          <other-project v-model="project.other_project" />
          <ActionBarProject create cancel reset @cancel="onCancel" />
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationObserver
  },
  data () {
    return {
      project: {
        other_project: {}
      }
    }
  },
  methods: {
    async onTokenSubmit (evt) {
      const project = await this.$services.projectinfo.post(this.project)
      if (project) {
        this.$router.push(this.localePath('project'))
      }
    },
    onTokenReset (evt) {
      this.project = {
        other_project: {}
      }
    },
    onCancel (evt) {
      this.$router.push(this.localePath('no_project'))
    }
  }
}
</script>

<style>
</style>
