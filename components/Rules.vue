/* eslint-disable vue/no-v-html */
<template>
  <ol>
    <li
      v-html="
        $t('rule1', {
          registrationOpenDate: $d(registrationOpenDate, 'long'),
          registrationClosedDate: $d(registrationClosedDate, 'long'),
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
      v-html="$t('rule6', { projectClosedDate: $d(projectClosedDate, 'long') })"
    />
    <li
      v-html="$t('rule7', { projectClosedDate: $d(projectClosedDate, 'long') })"
    />
    <li
      v-html="$t('rule8', { officialStartDate: $d(officialStartDate, 'long') })"
    />
    <li
      v-html="$t('rule9', { officialStartDate: $d(officialStartDate, 'long') })"
    />
    <li v-html="$t('rule10')" />
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
