<template>
  <div>
    <b-jumbotron class="bg-info" />
    <b-container>
      <h1> {{ $t('rules') }} </h1>
      <h3> {{ $t('intro') }} </h3>
      <h2 v-if="settings.isActive">
        {{ $t('intro2',{ officialStartDate: $d(officialStartDate, 'long') }) }}
      </h2>
      <p>
        <b> {{ $t('agree') }} </b>
      </p>
      <p>
        <rules v-if="settings.isActive" :settings="settings" />
        <b> {{ $t('problems') }} </b>
        <i18n path="href" tag="span">
          <template #link>
            <a href="mailto:info@coolestprojects.be?subject=CoolestProjectsRegistration"><b>{{ $t('href_text') }}</b></a>
          </template>
        </i18n>
      </p>
      <b-alert v-if="!settings.isActive" show variant="warning">
        {{ $t('No Event is active please come again later') }}
      </b-alert>
      <b-alert v-if="settings.isActive && !settings.isRegistrationOpen" show variant="warning">
        {{ $t('Registration opens on',{ registrationOpenDate: $d(registrationOpenDate, 'long'), registrationClosedDate: $d(registrationClosedDate, 'long') }) }}
      </b-alert>
      <b-alert v-if="settings.isActive && settings.waitingListActive" show variant="warning">
        {{ $t('Waiting list is active') }}
      </b-alert>
      <b-button v-if="settings.isActive && settings.isRegistrationOpen" variant="dark" class="button-hero" :to="localePath('registration')">
        <font-awesome-icon :icon="['fas', 'paper-plane']" /> {{ $t('start') }}
      </b-button>
    </b-container>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import Vue from 'vue'
import { Settings } from '~/api'

export default Vue.extend({
  layout: 'fullwith',
  async asyncData (context:Context) {
    const settings = await context.app.$http.settings.fetch()
    return { settings }
  },
  data () {
    const settings:Settings = {}
    return {
      settings
    }
  },
  computed: {
    officialStartDate (): Date | null {
      return this.settings.officialStartDate ? new Date(this.settings.officialStartDate) : null
    },
    registrationOpenDate (): Date | null {
      return this.settings.registrationOpenDate ? new Date(this.settings.registrationOpenDate) : null
    },
    registrationClosedDate (): Date | null {
      return this.settings.registrationClosedDate ? new Date(this.settings.registrationClosedDate) : null
    }
  }
})
</script>

<style>
</style>
