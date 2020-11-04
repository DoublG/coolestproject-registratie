<template>
  <b-row>
    <b-col>
      <h1>{{ $t('MakeChoice') }}</h1>
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
import ActionBarProject from '~/components/ActionBarProject.vue'

export default {
  middleware: 'authenticated',
  components: {
    ActionBarProject
  },
  data () {
    return {}
  },
  computed: {
    create_project: {
      set (value) {
        this.$store.commit('create_project', value)
      },
      get () {
        return this.$store.state.create_project
      }
    }
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
