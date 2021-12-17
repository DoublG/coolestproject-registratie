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
  components: {
  },
  layout: 'fullwith',
  data () {
    return {}
  }
}
</script>

<style>
</style>
