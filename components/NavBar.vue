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
            <!--
            <b-nav-item v-if="!isLoggedIn" :to="localePath('registration')">
              {{ $t('Registratie') }}
            </b-nav-item>-->
            <b-nav-item v-if="!isLoggedIn" :to="localePath('login')">
              <font-awesome-icon :icon="['fas', 'unlock']" /> {{$t('Login')}}
            </b-nav-item>
            <b-nav-item v-if="isLoggedIn" :to="localePath('project')">
              <font-awesome-icon :icon="['fas', 'diagram-project']" /> {{$t('Project')}}
            </b-nav-item>
            <b-nav-item v-if="isLoggedIn" :to="localePath('user')">
              <font-awesome-icon :icon="['fas', 'user']" /> {{$t('User')}}
            </b-nav-item>
            <b-nav-item v-if="isLoggedIn" :to="localePath('rules')">
              <font-awesome-icon :icon="['fas', 'plus']" /> {{$t('Rules')}}
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="isLoggedIn" :to="localePath('logout')" @click="logout">
              <font-awesome-icon :icon="['fas', 'lock']" /> {{$t('Logout')}}
            </b-nav-item>
            <b-nav-form>
                 <font-awesome-icon :icon="['fas', 'earth-europe']" />
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loggedIn: false,
      langs: ['nl', 'fr', 'en']
    }
  },
  computed: {
    ...mapGetters('auth', [
      'isLoggedIn'
    ])
  },
  mounted () {},
  methods: {
    async logout () {
      await this.$services.logout.post()
      await this.$store.dispatch('auth/logout')
    }
  }
}
</script>
<style></style>
