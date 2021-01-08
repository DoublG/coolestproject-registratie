<template>
  <b-row>
    <b-col>
      <h1>{{ $t('CreateViaToken') }}</h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onTokenSubmit)" @reset.prevent="onTokenReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required|max:36|min:36" name="ProjectCode">
            <b-form-group
              id="input-group-22"
              :label="$t('Projectcode:')"
              :description="$t('Geefcode')"
              label-for="input-22"
            >
              <b-form-input
                id="input-22"
                v-model="project_code"
                :state="errors[0] ? false : (valid ? true : null)"
                placeholder="Code"
                aria-describedby="input-22-live-feedback"
              />
              <b-form-invalid-feedback id="input-22-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ActionBarProject
            create
            cancel
            @cancel="onCancel"
          />
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ActionBarProject from '~/components/ActionBarProject.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    ActionBarProject
  },
  data () {
    return {
      project_code: null
    }
  },
  computed: {},
  methods: {
    async onTokenSubmit (evt) {
      try {
        // link to project
        this.$nuxt.$emit('clear-msg')
        await this.$services.projectinfo.post_token(this.project_code)
        this.$nuxt.$emit('display-msg', this.$i18n.t('successChange'), 'success')
        this.$router.push('project')
      } catch (error) {
        this.$nuxt.$emit('display-msg', this.$i18n.t('failedChange'), 'danger')
      }
    },
    onCancel (evt) {
      this.$router.push('no_project')
    }
  }
}
</script>

<style>
</style>
