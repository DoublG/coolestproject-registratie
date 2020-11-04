<template>
  <div>
    <b-jumbotron class="bg-info" />
    <b-container>
      <h1> {{ $t('rules') }} </h1>
      <h3> {{ $t('intro') }} </h3>
      <h2> {{ $t('intro2') }} </h2>
      <p>
        <b> {{ $t('agree') }} </b>
      </p>
      <p>
        <ol>
          <li v-html="$t('rule0')" />
          <li v-html="$t('rule1')" />
          <li v-html="$t('rule2')" />
          <li v-html="$t('rule3')" />
          <li v-html="$t('rule4')" />
          <li v-html="$t('rule5')" />
          <li v-html="$t('rule6')" />
          <li v-html="$t('rule7')" />
          <li v-html="$t('rule8')" />
          <li v-html="$t('rule9')" />
        </ol>
        <b> {{ $t('problems') }}
        </b>
        <span v-html="$t('href')" />
      </p>
      <b-button variant="dark" class="button-hero" to="registration">
        <font-awesome-icon :icon="['fas', 'paper-plane']" /> {{ $t('start') }}
      </b-button>
    </b-container>
  </div>
</template>
<script>
export default {
  layout: 'fullwith',
  components: {
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
