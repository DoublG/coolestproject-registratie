<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      {{ $t('Page not found') }}
    </h1>
    <h1 v-else>
      {{ $t('An error occurred') }}
    </h1>
    <p>{{ $t('Mogelijke oplossingen voor de error') }}</p>
    <b-button
      type="submit"
      variant="info"
      class="button-hero"
      @click="$router.push({ path: '/' })"
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
