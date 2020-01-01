<template>
  <Project />
</template>
<script>
import Project from '~/components/Project.vue'

export default {
  middleware: ['authenticated', 'project'],
  components: {
    Project
  }
}
</script>

<i18n>
{
  "en": {
  },
  "fr": {
  },
  "nl": {
  }
}
</i18n>

<style>
</style>
