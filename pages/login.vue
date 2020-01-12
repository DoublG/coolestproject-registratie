<template>
  <b-row>
    <b-col>
      <h1>{{ $t('titleLogin') }}</h1>
      <b-alert dismissible :show="show" :variant="variant">
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
                type="email"
                placeholder="email adres"
                aria-describedby="input-1-live-feedback"
                :state="errors[0] ? false : (valid ? true : null)"
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-form-group>
            <b-button
              type="submit"
              variant="info"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'envelope']" /> {{ $t('Stuur me een logincode') }}
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
      email: null
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
  async asyncData ({ query, app, store, route }) {
    if (query.token) {
      try {
        const loginToken = await app.$services.login.post(query.token)
        store.commit('auth/api_key', loginToken.api_key)
        store.commit('auth/expires', loginToken.expires)
        app.router.replace({ path: '/user' })
      } catch (ex) {
        return {
          message: ex,
          variant: 'danger',
          show: true
        }
      }
    }
  },
  methods: {
    async onSubmit (evt) {
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
    },
    onReset (evt) {
      this.email = null
    }
  }
}
</script>

<i18n>
{
  "en": {
    "failureMessage": "Something went wrong please try again",
    "message": "Something went wrong",
    "Stuur me een logincode": "Please send me the login code",
    "successMessage": "We've sent a logincode please check your mailbox",
    "titleLogin": "Login"
  },
  "fr": {

    "failureMessage": "Une erreur s'est produite. Merci d'essayer à nouveau",
    "message": "Il semblerait que cela n'a pas fonctionné",
    "Stuur me een logincode": "Pourriez-vous m'envoyer un code de connexion ?",
    "successMessage": "Nous avons envoyé un code de connexion - merci de bien vouloir vérifier votre boîte mail",
    "titleLogin": "Login"
  },
  "nl": {
    "failureMessage": "Er is iets misgelopen probeer later opnieuw",
    "message": "Er is iets misgelopen",
    "Stuur me een logincode": "Stuur me een logincode aub",
    "successMessage": "We hebben een logincode verzonden check je mailbox",
    "titleLogin": "Login"
  }
}
</i18n>

<style>
</style>
