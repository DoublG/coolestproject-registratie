<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      {{ project_name }} - {{ project_descr }}
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
    ...mapState('project', [
      'project_name',
      'project_descr',
      'project_type',
      'project_lang'
    ])
  },
  async asyncData ({ store, query, app, redirect, route }) {
    // load projectData & store in userstore
    const projectData = await axios.get('/api/projectinfo', { headers: { api_key: store.state.auth.api_key } })
    await store.dispatch('project/updateProject', projectData.data)
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
