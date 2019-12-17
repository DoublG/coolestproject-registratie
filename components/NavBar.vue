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
            <b-nav-item :to="localePath('registration')" v-if="!isLoggedIn">
              {{ $t('Registratie') }}
            </b-nav-item>
<<<<<<< HEAD
            <b-nav-item :to="localePath('login')" v-if="!isLoggedIn">
              <font-awesome-icon :icon="['fas', 'unlock']" /> Login
            </b-nav-item>
            <b-nav-item :to="localePath('project')" v-if="isLoggedIn">
              <font-awesome-icon :icon="['fas', 'project-diagram']" /> Project
            </b-nav-item>
            <b-nav-item :to="localePath('user')" v-if="isLoggedIn">
=======
            <b-nav-item v-if="!loggedIn" :to="localePath('login')">
              <font-awesome-icon :icon="['fas', 'unlock']" /> Login
            </b-nav-item>
            <b-nav-item v-if="loggedIn" :to="localePath('project')">
              <font-awesome-icon :icon="['fas', 'project-diagram']" /> Project
            </b-nav-item>
            <b-nav-item v-if="loggedIn" :to="localePath('user')">
>>>>>>> ce691dcf6045e6bf14d39c9d4f6e3425445abce8
              <font-awesome-icon :icon="['fas', 'user']" /> User
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
<<<<<<< HEAD
            <b-nav-item :to="localePath('logout')" v-if="isLoggedIn" @click="logout">
=======
            <b-nav-item v-if="loggedIn" :to="localePath('logout')">
>>>>>>> ce691dcf6045e6bf14d39c9d4f6e3425445abce8
              <font-awesome-icon :icon="['fas', 'lock']" /> Logout
            </b-nav-item>
            <b-nav-form>
              <font-awesome-icon :icon="['fas', 'globe-europe']" />
            </b-nav-form>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loggedIn: false,
      langs: ['nl', 'fr', 'en']
    }
  },
<<<<<<< HEAD
  mounted () {},
  computed: {
    ...mapGetters('auth', [
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ])
  }
=======
  computed: {},
  mounted () {
    this.loggedIn = new Date(this.$store.state.auth.expires) > new Date()
  },
  methods: {}
>>>>>>> ce691dcf6045e6bf14d39c9d4f6e3425445abce8
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
