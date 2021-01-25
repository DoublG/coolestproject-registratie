<template>
  <b-row>
    <b-col>
      <h1>{{ $t('titleLogin') }}</h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <login v-model="login" :field-status="login_field_status" />
          <b-form-group>
            <b-button
              :disabled="loading"
              type="submit"
              variant="info"
              class="button-hero"
            >
              <span v-if="loading"><b-spinner type="grow" /> {{ $t('pleaseWait') }}</span>
              <span v-else><font-awesome-icon :icon="['fas', 'envelope']" /> {{ $t('Stuur me een logincode') }}</span>
            </b-button>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver } from 'vee-validate'

export default {
  middleware: 'notAuthenticated',
  components: {
    ValidationObserver
  },
  data () {
    return {
      login: { email: null },
      loading: false
    }
  },
  computed: {
    login_field_status () {
      return {
        email: {
          rw: true
        }
      }
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.loading = true
      // redirect to user page (token in GET string)
      const token = this.$route.query.token
      if (token) {
        const loginToken = await this.$services.login.post(token)
        if (loginToken) {
          await this.$store.dispatch('auth/update', { expires: loginToken.expires })
          this.$router.replace(this.localePath('user'))
        }
      }
      this.loading = false
    })
  },
  methods: {
    async onSubmit (evt) {
      this.loading = true
      await this.$services.mail.post(this.login)
      this.loading = false
    },
    onReset (evt) {
      this.email = null
    }
  }
}
</script>

<style>
</style>
