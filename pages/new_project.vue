<template>
  <b-row>
    <b-col>
      <h1>
        {{ $t('createProject') }}
      </h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onCreateProject)" @reset.prevent="onResetProject">
          <own-project v-model="project.own_project" />
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
  components: {
    ValidationObserver
  },
  middleware: 'authenticated',
  data () {
    return {
      project: {
        own_project: {}
      }
    }
  },
  methods: {
    onResetProject (evt) {
      this.project = { own_project: {} }
    },
    onCancel (evt) {
      this.$router.push(this.localePath('no_project'))
    },
    async onCreateProject (evt) {
      await this.$services.projectinfo.post(this.project)
      this.$router.push(this.localePath('project'))
    }
  }
}
</script>

<style>
</style>
