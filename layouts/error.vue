<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <p>Mogelijke oplossingen voor de error</p>
    <b-button
      @click="$router.push({ path: '/' })"
      type="submit"
      variant="info"
      class="button-hero"
    >
      {{ $t('Back to homepage') }}
    </b-button>
  </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'error'
  }
</script>