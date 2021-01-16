<template>
  <b-row>
    <b-col>
      <h1>{{ $t("titleReg") }}</h1>
      <global-notification />
      <h2>{{ $t("personal_info") }}</h2>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <user v-model="user" />
          <h1>{{ $t("Project") }}</h1>
          <b-form-group>
            <b-form-radio v-model="is_own_project" name="own_project" value="own">
              {{ $t("eigenProject") }}
            </b-form-radio>
            <b-form-radio v-model="is_own_project" name="own_project" value="other">
              {{ $t("medeProject") }}
            </b-form-radio>
          </b-form-group>
          <div v-if="is_own_project === 'own'">
            <own-project v-model="own_project" />
          </div>
          <div v-else>
            <other-project v-model="other_project" />
          </div>
          <mandatory-questions v-model="mandatory_approvals" />
          <b-form-group>
            <b-button
              :disabled="loading"
              type="submit"
              variant="info"
              class="button-hero"
            >
              <span
                v-if="loading"
              ><b-spinner type="grow" /> {{ $t("pleaseWait") }}</span>
              <span
                v-else
              ><font-awesome-icon
                 v-if="!loading"
                 :icon="['fas', 'paper-plane']"
               />
                {{ $t("Ik schrijf me in") }}</span>
            </b-button>
            <b-button
              :disabled="loading"
              type="reset"
              variant="warning"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'trash-restore']" />
              {{ $t("verwijder alles") }}
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
  async asyncData ({ store, app, redirect }) {},
  data () {
    return {
      loading: false,
      is_own_project: 'own'
    }
  },
  computed: {
    own_project: {
      set (value) {
        this.$store.dispatch('registration/own_project', value)
      },
      get () {
        return this.$store.getters['registration/own_project']
      }
    },
    other_project: {
      set (value) {
        this.$store.dispatch('registration/other_project', value)
      },
      get () {
        return this.$store.getters['registration/other_project']
      }
    },
    user: {
      set (value) {
        const u = this.$store.getters['registration/user']
        u.language = this.$i18n.locale
        this.$store.dispatch('registration/user', u)
      },
      get () {
        return this.$store.getters['registration/user']
      }
    },
    mandatory_approvals: {
      set (value) {
        const u = this.$store.getters['registration/user']
        u.mandatory_approvals = value
        this.$store.dispatch('registration/user', u)
      },
      get () {
        const u = this.$store.getters['registration/user']
        return u.mandatory_approvals
      }
    }
  },
  methods: {
    async onSubmit (evt) {
      this.loading = true
      try {
        this.$nuxt.$emit('clear-msg')

        const registration = { project: {} }
        if (this.is_own_project === 'own') {
          registration.project.own_project = this.own_project
        } else {
          registration.project.other_project = this.other_project
        }
        registration.user = this.user

        await this.$services.registration.post(registration)
        this.onReset(evt)
        app.$bus.$emit('display-msg', app.i18n.t('message_successReg'), 'success')
        this.$nuxt.$emit('display-msg', this.$i18n.t('message_successReg'), 'success')
      } catch (error) {
        this.$nuxt.$emit('display-msg', this.$i18n.t('failedReg'), 'danger')
      }
      this.loading = false
      window.scrollTo(0, 0)
    },
    onReset (evt) {
      this.$store.dispatch('registration/reset')
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
<style></style>
