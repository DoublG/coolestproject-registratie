<template>
  <b-row>
    <b-col>
      <h1>{{ $t('titleLogin') }}</h1>
      <b-alert :show="show" :variant="variant" dismissible>
        {{ message }}
      </b-alert>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required|email" name="Email">
            <b-form-group
              id="input-group-1"
              label="Email adres"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="email"
                :state="errors[0] ? false : (valid ? true : null)"
                type="email"
                placeholder="email adres"
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
      show: false,
      message: null,
      variant: null,
      email: null,
      loading: false
    }
  },
  computed: {
    api_key: {
      set (value) {
        this.$store.dispatch('auth/api_key', value)
      },
      get () {
        return this.$store.state.user.api_key
      }
    },
    expires: {
      set (value) {
        this.$store.dispatch('auth/expires', value)
      },
      get () {
        return this.$store.state.user.expires
      }
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.loading = true
      if (this.$route.query.token) {
        try {
          const loginToken = await this.$services.login.post(this.$route.query.token)
          this.$store.commit('auth/api_key', loginToken.api_key)
          this.$store.commit('auth/expires', loginToken.expires)
          this.$router.replace({ path: '/user' })
        } catch (ex) {
          this.message = ex
          this.variant = 'danger'
          this.show = true
        }
      }
      this.loading = false
    })
  },
  methods: {
    async onSubmit (evt) {
      this.show = false
      this.loading = true
      try {
        await this.$services.mail.post(this.email)
        this.variant = 'success'
        this.message = this.$i18n.t('successMessage')
        this.show = true
      } catch (error) {
        this.variant = 'danger'
        this.message = this.$i18n.t('failureMessage')
        this.show = true
      }
      this.loading = false
    },
    onReset (evt) {
      this.email = null
      this.show = false
    }
  }
}
</script>

<style>
</style>
