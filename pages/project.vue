<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      {{ lastname }} - {{ firstname }}
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
      'lastname',
      'firstname'
    ])
  },
  async asyncData ({ store, query, app, redirect, route }) {
    // load userdata & store in userstore
    const userData = await axios.get('/api/userinfo', { headers: { api_key: store.state.auth.api_key } })
    store.dispatch('user/firstname', userData.data.firstname)
    store.dispatch('user/lastname', userData.data.lastname)
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Project"
  },
  "fr": {
    "title": "Project"
  },
  "nl": {
    "title": "Project"
  }
}
</i18n>

<style>
</style>
