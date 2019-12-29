<template>
  <Project create />
</template>
<script>
import Project from '~/components/Project.vue'

export default {
  middleware: ['authenticated'],
  components: {
    Project
  }
}
</script>

<i18n>
{}
</i18n>

<style>
</style>
