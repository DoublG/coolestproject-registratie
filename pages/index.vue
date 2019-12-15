<template>
  <div>
    <b-jumbotron class="bg-info">
      <template v-slot:header>
        <div>
          <Logo />
          <span class="hero-text" style="line-height:1.5em">Coderdojo Belgium</span>
        </div>
      </template>
      <template v-slot:lead>
        Coolest Projects Registration Procedure 2020
      </template>
      <b-button variant="dark" class="button-hero" href="/registration">
        <font-awesome-icon :icon="['fas', 'paper-plane']" /> Start registratie/inscription/registration
      </b-button>
    </b-jumbotron>
    <b-container>
      <h1>Coolest projects Belgium</h1>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p>
    </b-container>
    <b-row>
      <b-col>hier komt nog wat denk ik</b-col>
    </b-row>
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'

export default {
  layout: 'fullwith',
  components: {
    Logo
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
