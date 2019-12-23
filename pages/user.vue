<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      <ValidationObserver ref="observer" v-slot="{ passes }">
         <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="FirstName">
            <b-form-group
              id="input-group-2"
              :label="$t('Voornaam:')"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="firstname"
                :placeholder="$t('GeefVoornaam:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-2-live-feedback"
              />
              <b-form-invalid-feedback id="input-2-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="LastName">
            <b-form-group
              id="input-group-1"
              :label="$t('Achternaam:')"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="lastname"
                :placeholder="$t('GeefAchternaam:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-1-live-feedback"
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
              <font-awesome-icon :icon="['fas', 'user-edit']" /> {{ $t('Aanpassen') }}
            </b-button>
            <b-button
              type="reset"
              variant="danger"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'trash-alt']" />  {{ $t('Resetten') }}
            </b-button>
          </b-form-group>
         </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'authenticated',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {}
  },
  computed: {
    firstname: {
      set (value) {
        this.$store.commit('user/firstname', value)
      },
      get () {
        return this.$store.state.user.firstname
      }
    },
    lastname: {
      set (value) {
        this.$store.commit('user/lastname', value)
      },
      get () {
        return this.$store.state.user.lastname
      }
    },
    ...mapState('user', [
      'language',
      'email',
      'postalcode',
      'birthmonth',
      'gsm'
    ])
  },
  methods: {
    async onSubmit (evt) {
      try {
        // pass language to store
        /*
        this.$store.dispatch('registration/language', this.$i18n.locale)
        this.variant = 'success'
        this.message = this.$i18n.t('successReg')
        this.show = true */

        // await this.$axios.$post('/api/register', this.$store.getters['registration/sanitizedJSON'])
        await this.onReset(evt)
      } catch (error) {
        this.variant = 'danger'
        this.message = this.$i18n.t('failedReg')
        this.show = true
      }
      window.scrollTo(0, 0)
    },
    async onReset (evt) {
      const userData = await this.$axios.$get('/api/userinfo', { headers: { api_key: this.$store.state.auth.api_key } })
      await this.$store.dispatch('user/updateUser', userData)
    }
  },
  async asyncData ({ store, query, app, redirect, route }) {
    // load userdata & store in userstore
    const userData = await axios.get('/api/userinfo', { headers: { api_key: store.state.auth.api_key } })
    store.dispatch('user/updateUser', userData.data)
  }
}
</script>

<i18n>
{
  "en": {
    "title": "User"
  },
  "fr": {
    "title": "User"
  },
  "nl": {
    "title": "User"
  }
}
</i18n>

<style>
</style>
