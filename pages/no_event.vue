<template>
  <b-row>
    <b-col>
      <h1>
        {{ $t('NoEventHeader') }}
      </h1>
      <b-alert show variant="warning">
        {{ $t('No Event is active please come again later') }}
      </b-alert>
    </b-col>
  </b-row>
</template>
<script>
export default {
  middleware: 'notAuthenticated',
  components: {
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style>
</style>
