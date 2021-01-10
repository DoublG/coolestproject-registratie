<template>
  <b-row>
    <b-col>
      <h1>
        {{ $t('createProject') }}
      </h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onCreateProject)" @reset.prevent="onResetProject">
          <own-project v-model="project" />
          <ActionBarProject
            create
            cancel
            reset
            @cancel="onCancel"
          />
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
export default {
  middleware: 'authenticated',
  components: {
    ValidationObserver
  },
  data () {
    return {
      project: {}
    }
  },
  methods: {
    onResetProject (evt) {
      this.project = {}
    },
    onCancel (evt) {
      this.$router.push('no_project')
    },
    async onCreateProject (evt) {
      await this.$services.projectinfo.post(this.project)
      this.$router.push({ path: '/project' })
    }
  }
}
</script>

<style>
</style>
