/* eslint-disable vue/no-v-html */
<template>
  <ol>
    <li
      v-html="
        $t('rule1', {
          registrationOpenDate: settings.registrationOpenDate,
          registrationClosedDate: settings.registrationClosedDate,
          maxRegistration: settings.maxRegistration
        })
      "
    />
    <li
      v-html="$t('rule2', { minAge: settings.minAge, maxAge: settings.maxAge })"
    />
    <li v-html="$t('rule3')" />
    <li v-html="$t('rule4')" />
    <li v-html="$t('rule5', { maxParticipants: settings.maxParticipants })" />
    <li
      v-html="$t('rule6', { projectClosedDate: settings.projectClosedDate })"
    />
    <li
      v-html="$t('rule7', { projectClosedDate: settings.projectClosedDate })"
    />
    <li
      v-html="$t('rule8', { officialStartDate: settings.officialStartDate })"
    />
    <li
      v-html="$t('rule9', { officialStartDate: settings.officialStartDate })"
    />
    <li v-html="$t('rule10')" />
  </ol>
</template>

<script>
export default {
  async fetch () {
    // get all settings
    this.settings = await this.$nuxt.context.app.$services.settings.get()
  },

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
  }
}
</script>
