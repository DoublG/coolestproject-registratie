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
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
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
