<template>
  <div>
    <b-navbar toggleable="lg">
      <b-container>
        <nuxt-link :to="localePath('index')">
          <b-navbar-brand class="pr-5">
            <img
              width="100"
              height="75"
              src="~/assets/CPlogo.png"
              class="img-fluid"
              alt="Coolest Projects"
              itemprop="logo"
            >
          </b-navbar-brand>
        </nuxt-link>
        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="localePath('registration')">
              {{ $t('Registratie') }}
            </b-nav-item>
            <b-nav-item v-if="!loggedIn" :to="localePath('login')">
              <font-awesome-icon :icon="['fas', 'unlock']" /> Login
            </b-nav-item>
            <b-nav-item v-if="loggedIn" :to="localePath('project')">
              <font-awesome-icon :icon="['fas', 'project-diagram']" /> Project
            </b-nav-item>
            <b-nav-item v-if="loggedIn" :to="localePath('user')">
              <font-awesome-icon :icon="['fas', 'user']" /> User
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="loggedIn" :to="localePath('logout')">
              <font-awesome-icon :icon="['fas', 'lock']" /> Logout
            </b-nav-item>
            <b-nav-item v-for="(lang, i) in langs" :key="`Lang${i}`" :to="switchLocalePath(lang)">
              {{ lang }}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loggedIn: false,
      langs: ['nl', 'fr', 'en']
    }
  },
  computed: {},
  mounted () {
    this.loggedIn = new Date(this.$store.state.auth.expires) > new Date()
  },
  methods: {}
}
</script>
<style></style>

<i18n>
{
  "en": {
      "Registratie": "Registration"
      },
  "fr": {
    "Registratie": "Inscriptione"
     },
  "nl": {
    "Registratie": "Registratie"
  }
}
</i18n>
