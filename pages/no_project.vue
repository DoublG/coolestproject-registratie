<template>
  <b-row>
    <b-col>
      <h1>{{ $t('MakeChoice') }}</h1>
      <global-notification />
      <ActionBarProject
        project
        token
        @createProject="onCreateProject"
        @enterToken="onEnterToken"
      />
    </b-col>
  </b-row>
</template>
<script>
export default {
  middleware: 'authenticated',
  components: {
  },
  data () {
    return {}
  },
  methods: {
    onCreateProject (evt) {
      this.$router.push('/new_project')
    },
    onEnterToken (evt) {
      this.$router.push('/token')
    }
  }
}
</script>

<style>
</style>
