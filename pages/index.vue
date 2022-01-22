<template>
  <div>
    <b-jumbotron class="bg-info" />
    <b-container>
      <h1> {{ $t('rules') }} </h1>
      <h3> {{ $t('intro') }} </h3>
      <h2> {{ $t('intro2',{ officialStartDate: $d(officialStartDate, 'long') }) }} </h2>
      <p>
        <b> {{ $t('agree') }} </b>
      </p>
      <p>
        <rules v-if="settings" />
        <b> {{ $t('problems') }} </b>
        <i18n path="href" tag="span">
          <template #link>
            <a href="mailto:info@coolestprojects.be?subject=CoolestProjectsRegistration"><b>{{ $t('href_text') }}</b></a>
          </template>
        </i18n>
      </p>
      <b-alert v-if="!settings" show variant="warning">
        {{ $t('No Event is active please come again later') }}
      </b-alert>
      <b-alert v-if="settings && settings.waitingListActive" show variant="warning">
        {{ $t('Waiting list is active') }}
      </b-alert>
      <b-button v-if="settings" variant="dark" class="button-hero" :to="localePath('registration')">
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
    return { settings }
  },
  data () {
    return {
      settings: {
        officialStartDate: null
      }
    }
  },
  computed: {
    officialStartDate () { return new Date(this.settings.officialStartDate) }
  }
}
</script>

<style>
</style>
