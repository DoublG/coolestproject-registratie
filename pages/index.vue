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
        <ol>
          <li v-html="$t('rule0')" />
          <li v-html="$t('rule1')" />
          <li v-html="$t('rule2')" />
          <li v-html="$t('rule3')" />
          <li v-html="$t('rule4')" />
          <li v-html="$t('rule5')" />
          <li v-html="$t('rule6')" />
          <li v-html="$t('rule7')" />
          <li v-html="$t('rule8')" />
          <li v-html="$t('rule9')" />
        </ol>
        <b> {{ $t('problems') }}
        </b>
        <span v-html="$t('href')" />
      </p>
      <b-alert v-if="noEvent" show variant="warning">
        {{ $t('No Event is active please come again later') }}
      </b-alert>
      <b-button v-else variant="dark" class="button-hero" :to="localePath('registration')">
        <font-awesome-icon :icon="['fas', 'paper-plane']" /> {{ $t('start') }}
      </b-button>
    </b-container>
  </div>
</template>
<script>
export default {
  layout: 'fullwith',
  components: {
  },
  async asyncData ({ store, query, app, redirect, route }) {
    const settings = await app.$services.settings.get()
    if (!settings) {
      return { noEvent: true }
    }
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
