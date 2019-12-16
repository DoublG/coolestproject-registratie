<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      <b-alert dismissible :show="show" :variant="variant">
        {{ message }}
      </b-alert>
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
      />
      </b-form-group>
      <b-form-group>
        <b-button
          type="submit"
          variant="info"
          class="button-hero"
        >
          <font-awesome-icon :icon="['fas', 'envelope']" /> {{ $t('Stuur me een logincode') }}
        </b-button>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'

export default {
  components: {
  },
  data () {
    return {}
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
          message: app.i18n.t('message'),
          variant: 'danger',
          show: true
        }
      }
    }
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Login",
    "message": "Computer says no",
    "Stuur me een logincode": "Please send me the login code"
  },
  "fr": {
    "title": "Login",
    "message": "Er is iets missgelopen",
    "Stuur me een logincode": "Envoyez-moi un code de connexione"
  },
  "nl": {
    "title": "Login",
    "message": "Er is iets missgelopen",
    "Stuur me een logincode": "Stuur me een logincode"
  }
}
</i18n>

<style>
</style>
