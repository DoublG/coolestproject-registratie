<template>
  <b-row>
    <b-col>
      <h1>{{ $t("titleReg") }}</h1>
      <b-alert :show="show" :variant="variant" dismissible>
        {{ message }}
      </b-alert>
      {{ user }}
      <h2>{{ $t("personal_info") }}</h2>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <user v-model="user" />
          <h1>{{ $t("Project") }}</h1>
          <b-form-group>
            <b-form-radio v-model="own_project" name="own_project" value="own">
              {{ $t("eigenProject") }}
            </b-form-radio>
            <b-form-radio v-model="own_project" name="own_project" value="other">
              {{ $t("medeProject") }}
            </b-form-radio>
          </b-form-group>
          <div v-if="own_project === 'own'">
            <own-project v-model="project" />
          </div>
          <div v-else>
            <other-project v-model="project" />
          </div>
          <mandatory-questions v-model="user.mandatory_approvals" />
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
// import { mapState, mapGetters } from 'vuex'
// import { addYears, differenceInYears } from 'date-fns'
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
      project: {
        project_name: null,
        project_descr: null,
        project_type: null,
        project_code: null,
        project_lang: null
      },
      user: {
        year: null,
        month: null,
        email: null,
        firstname: null,
        lastname: null,
        sex: null,
        gsm: null,
        via: null,
        medical: null,
        email_guardian: null,
        gsm_guardian: null,
        t_size: null,
        general_questions: {},
        contact: {
          postalcode: null,
          street: null,
          house_number: null,
          bus_number: null,
          municipality_name: null
        },
        mandatory_approvals: []
      },
      own_project: 'own',
      show: false,
      variant: 'success',
      message: this.$i18n.t('successReg')
    }
  },
  methods: {
    async onSubmit (evt) {
      this.show = false
      this.loading = true
      try {
        // pass language to store
        this.$store.dispatch('registration/language', this.$i18n.locale)
        await this.$services.registration.post()
        this.onReset(evt)
        this.variant = 'success'
        this.message = this.$i18n.t('successReg')
        this.show = true
      } catch (error) {
        this.variant = 'danger'
        this.message = this.$i18n.t('failedReg')
        this.show = true
      }
      this.loading = false
      window.scrollTo(0, 0)
    },
    onReset (evt) {
      this.$store.dispatch('registration/clear_form')
      this.year = this.month = null // clean temp fields
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
<style></style>
