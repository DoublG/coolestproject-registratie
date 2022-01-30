<template>
  <div>
    <b-jumbotron class="bg-info" />
    <b-container>
      <p>
        <strong> {{ $t('agree') }} </strong>
      </p>
      <p>
        <rules :settings="settings" />
      </p>
    </b-container>
  </div>
</template>
<script>
export default {
  components: {
  },
  layout: 'fullwith',
  async asyncData (context) {
    const settings = await context.app.$http.settings.fetch()
    return { settings }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
