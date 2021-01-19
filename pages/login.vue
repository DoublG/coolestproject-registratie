<template>
  <b-row>
    <b-col>
      <h1>{{ $t('titleLogin') }}</h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required|email" name="Email">
            <b-form-group
              id="input-group-1"
              :label="$t('label_Email adres:')"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="email"
                :state="errors[0] ? false : (valid ? true : null)"
                type="email"
                :placeholder="$t('placeholder_Email adres:')"
                aria-describedby="input-1-live-feedback"
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-form-group>
            <b-button
              :disabled="loading"
              type="submit"
              variant="info"
              class="button-hero"
            >
              <span v-if="loading"><b-spinner type="grow" /> {{ $t('pleaseWait') }}</span>
              <span v-else><font-awesome-icon :icon="['fas', 'envelope']" /> {{ $t('Stuur me een logincode') }}</span>
            </b-button>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'notAuthenticated',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      email: null,
      loading: false
    }
  },
  computed: {},
  mounted () {
    this.$nextTick(async () => {
      this.loading = true
      // redirect to user page (token in GET string)
      const token = this.$route.query.token
      if (token) {
        try {
          const loginToken = await this.$services.login.post(token)
          this.$store.dispatch('auth/update', { key: loginToken.api_key, expires: loginToken.expires })
          this.$router.replace({ path: '/user' })
        } catch (ex) {
          this.$nuxt.$emit('display-msg', this.$i18n.t('failureMessage'), 'danger')
        }
      }
      this.loading = false
    })
  },
  methods: {
    async onSubmit (evt) {
      this.loading = true
      try {
        await this.$services.mail.post(this.email)
        this.$nuxt.$emit('display-msg', this.$i18n.t('successMessage'), 'success')
      } catch (error) {
        this.$nuxt.$emit('display-msg', this.$i18n.t('failureMessage'), 'danger')
      }
      this.loading = false
    },
    onReset (evt) {
      this.email = null
    }
  }
}
</script>

<style>
</style>
