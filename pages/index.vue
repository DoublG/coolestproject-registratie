<template>
  <div>
    <b-jumbotron class="bg-info" />
    <b-container>
      <h1> {{ $t('rules') }} </h1>
      <h3> {{ $t('intro') }} </h3>
      <h2> {{ $t('intro2') }} </h2>
      <p>
        <b> {{ $t('agree') }} </b>
      </p>
      <p>
        <rules />
        <b> {{ $t('problems') }} </b>
        <span v-html="$t('href')" />
      </p>
      <b-alert v-if="noEvent" show variant="warning">
        {{ $t('No Event is active please come again later') }}
      </b-alert>
      <b-alert v-if="!noEvent && settings.waitingListActive" show variant="warning">
        {{ $t('Waiting list is active') }}
      </b-alert>
      <b-button v-if="!noEvent" variant="dark" class="button-hero" :to="localePath('registration')">
        <font-awesome-icon :icon="['fas', 'paper-plane']" /> {{ $t('start') }}
      </b-button>
    </b-container>
  </div>
</template>
<script>
export default {
  layout: 'fullwith',
  async asyncData ({ store, query, app, redirect, route }) {
    const settings = await app.$services.settings.get()
    if (!settings) {
      return { noEvent: true }
    }
    return { settings }
  },
  data () {
    return {
      noEvent: false
    }
  }
}
</script>

<style>
</style>
