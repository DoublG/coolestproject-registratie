<template>
  <div>
    <b-jumbotron class="bg-info" />
    <b-container>
      <p>
        <b> {{ $t('agree') }} </b>
      </p>
      <p>
        <rules />
      </p>
    </b-container>
  </div>
</template>
<script>
export default {
  layout: 'fullwith',
  components: {
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
