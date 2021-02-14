<template>
  <div>
    <b-jumbotron class="bg-info" />
    <b-container>

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
      </p>
      <b-alert v-if="noEvent" show variant="warning">
        {{ $t('No Event is active please come again later') }}
      </b-alert>

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
