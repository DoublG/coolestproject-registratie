/* eslint-disable vue/no-v-html */
<template>
  <ol>
    <li>
      {{ $t('rule1', {
        registrationOpenDate: $d(registrationOpenDate),
        registrationClosedDate: $d(registrationClosedDate),
        maxRegistration: settings.maxRegistration
      }) }}
    </li>
    <li>
      {{ $t('rule2', { minAge: settings.minAge, maxAge: settings.maxAge }) }}
    </li>
    <li>
      {{ $t('rule3') }}
    </li>
    <li>
      {{ $t('rule4') }}
    </li>
    <li>
      {{ $t('rule5', { maxParticipants: settings.maxParticipants }) }}
    </li>
    <li>
      {{ $t('rule6', { projectClosedDate: $d(projectClosedDate) }) }}
    </li>
    <li>
      {{ $t('rule7', { projectClosedDate: $d(projectClosedDate) }) }}
    </li>
    <li>
      {{ $t('rule8', { officialStartDate: $d(officialStartDate) }) }}
    </li>
    <li>
      {{ $t('rule9', { officialStartDate: $d(officialStartDate) }) }}
    </li>
    <i18n path="rule10" tag="li">
      <template #privacy_link>
        <b><a target="privacy" href="https://www.coderdojobelgium.be/nl/coderdojo-belgium-privacyverklaring">{{ $t('privacy_text') }}</a></b>
      </template>
    </i18n>
  </ol>
</template>

<script>
export default {
  data () {
    return {
      settings: {
        registrationOpenDate: null,
        registrationClosedDate: null,
        minAge: 0,
        maxAge: 0,
        maxParticipants: 0,
        projectClosedDate: null,
        officialStartDate: null
      }
    }
  },
  async fetch () {
    // get all settings
    this.settings = await this.$nuxt.context.app.$services.settings.get()
  },
  computed: {
    projectClosedDate () { return new Date(this.settings.projectClosedDate) },
    registrationOpenDate () { return new Date(this.settings.registrationOpenDate) },
    registrationClosedDate () { return new Date(this.settings.registrationClosedDate) },
    officialStartDate () { return new Date(this.settings.officialStartDate) }
  }
}
</script>
