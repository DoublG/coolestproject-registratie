<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
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
import axios from 'axios'
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
  async asyncData ({ store, query, app, redirect }) {
    if (query.token) {
      try {
        const loginToken = await axios.post('/api/login', { jwt: query.token })
        // store the login token
        store.commit('auth/api_key', loginToken.data.api_key)
        store.commit('auth/expires', loginToken.data.expires)
        redirect('./user')
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
        await this.$axios.$post('/api/mailToken', {
          email: this.email
        })
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
    "title": "Login",
    "message": "Computer says no",
    "Stuur me een logincode": "Please send me the login code",
    "successMessage": "We've sent a logincode, please check your mailbox",
    "failureMessage": "Something went wrong please try again"
  },
  "fr": {
    "title": "Login",
    "message": "Er is iets missgelopen",
    "Stuur me een logincode": "Envoyez-moi un code de connexione",
    "successMessage": "We hebben een code opgestuurd, check je mailbox",
    "failureMessage": "Er is iets misgelopen, probeer later opnieuw"
  },
  "nl": {
    "title": "Login",
    "message": "Er is iets missgelopen",
    "Stuur me een logincode": "Stuur me een logincode",
    "successMessage": "We hebben een code opgestuurd, controleer je mailbox",
    "failureMessage": "Er is iets misgelopen, probeer later opnieuw"
  }
}
</i18n>

<style>
</style>
