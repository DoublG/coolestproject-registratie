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


<style>
</style>
