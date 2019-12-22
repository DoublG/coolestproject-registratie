<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      {{ lastname }} - {{ firstname }} - {{ email }}
      <p>postalcode: {{ postalcode }} language: {{ language }} gsm: {{ gsm }} birthmonth: {{ birthmonth }} </p>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  components: {
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('user', [
      'language',
      'lastname',
      'firstname',
      'email',
      'postalcode',
      'birthmonth',
      'gsm'
    ])
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
