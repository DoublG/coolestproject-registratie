<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      {{ $t('error_Page not found') }}
    </h1>
    <h1 v-else>
      {{ $t('error_An error occurred') }}
    </h1>
    <p>{{ $t('error_Possible solutions') }}</p>
    <b-button
      type="submit"
      variant="info"
      class="button-hero"
      @click="$router.push({ path: '/' })"
    >
      {{ $t('error_Back to homepage') }}
    </b-button>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error'
}
</script>
