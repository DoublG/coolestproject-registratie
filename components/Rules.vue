<template>
  <ol>
    <li>
      {{ $t('rule1', {
        registrationOpenDate: $d(registrationOpenDate,'long'),
        registrationClosedDate: $d(registrationClosedDate,'long'),
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
      {{ $t('rule5', { maxParticipants: settings.maxParticipants+1 }) }}
    </li>
    <li>
      {{ $t('rule6', { projectClosedDate: $d(projectClosedDate,'long') }) }}
    </li>
    <li>
      {{ $t('rule7', { projectClosedDate: $d(projectClosedDate,'long') }) }}
    </li>
    <li>
      {{ $t('rule8', { officialStartDate: $d(officialStartDate,'long') }) }}
    </li>
    <li>
      {{ $t('rule9', { officialStartDate: $d(officialStartDate,'long') }) }}
    </li>
    <i18n path="rule10" tag="li">
      <template #privacy_link>
        <b><a target="privacy" :href="link">{{ $t('privacy_text') }}</a></b>
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
    link () {
      let url = '/en/coderdojo-belgium-privacy-statement'
      if (this.$i18n.locale === 'nl') {
        url = '/nl/coderdojo-belgium-privacyverklaring'
      } else if (this.$i18n.locale === 'fr') {
        url = '/fr/déclaration-de-confidentialité-coderdojo-belgium'
      }
      return 'https://www.coderdojobelgium.be' + url
    },
    projectClosedDate () { return new Date(this.settings.projectClosedDate) },
    registrationOpenDate () { return new Date(this.settings.registrationOpenDate) },
    registrationClosedDate () { return new Date(this.settings.registrationClosedDate) },
    officialStartDate () { return new Date(this.settings.officialStartDate) }
  }
}
</script>
