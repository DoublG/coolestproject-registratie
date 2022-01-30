<i18n lang="yaml">
en:
  link: https://www.coderdojobelgium.be/en/coderdojo-belgium-privacy-statement
fr:
  link: https://www.coderdojobelgium.be/fr/déclaration-de-confidentialité-coderdojo-belgium
nl:
  link: https://www.coderdojobelgium.be/nl/coderdojo-belgium-privacyverklaring
</i18n>
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
        <b><a target="privacy" :href="$t('link')">{{ $t('privacy_text') }}</a></b>
      </template>
    </i18n>
  </ol>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  computed: {
    projectClosedDate () {
      return new Date(this.settings.projectClosedDate)
    },
    registrationOpenDate () {
      return new Date(this.settings.registrationOpenDate)
    },
    registrationClosedDate () {
      return new Date(this.settings.registrationClosedDate)
    },
    officialStartDate () {
      return new Date(this.settings.officialStartDate)
    }
  }
})
</script>
