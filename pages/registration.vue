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
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="Language"
            >
              <b-form-group
                id="input-group-18"
                :label="$t('Taal:')"
                :description="$t('taalJury')"
                label-for="select-18"
              >
                <b-form-select
                  id="select-18"
                  v-model="project_lang"
                  :options="languages"
                  :state="errors[0] ? false : valid ? true : null"
                  aria-describedby="input-18-live-feedback"
                />
                <b-form-invalid-feedback id="input-18-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="max:100"
              name="ProjectType"
            >
              <b-form-group
                id="input-group-166"
                :label="$t('Project_Type')"
                label-for="input-166"
              >
                <b-form-textarea
                  id="input-166"
                  v-model="project_type"
                  :state="errors[0] ? false : valid ? true : null"
                  aria-describedby="input-166-live-feedback"
                />
                <b-form-invalid-feedback id="input-166-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required|max:100"
              name="ProjectName"
            >
              <b-form-group
                id="input-group-20"
                :label="$t('Projectnaam:')"
                label-for="input-20"
              >
                <b-form-input
                  id="input-20"
                  v-model="project_name"
                  :placeholder="$t('GeefProjectnaam:')"
                  :state="errors[0] ? false : valid ? true : null"
                  aria-describedby="input-20-live-feedback"
                />
                <b-form-invalid-feedback id="input-20-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required|max:4000"
              name="ProjectDescription"
            >
              <b-form-group
                id="input-group-21"
                :label="$t('Omschrijving:')"
                label-for="input-21"
              >
                <b-form-textarea
                  id="input-21"
                  v-model="project_descr"
                  :state="errors[0] ? false : valid ? true : null"
                  aria-describedby="input-21-live-feedback"
                />
                <b-form-invalid-feedback id="input-21-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
          <div v-else>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required|max:36|min:36"
              name="ProjectCode"
            >
              <b-form-group
                id="input-group-22"
                :label="$t('Projectcode:')"
                :description="$t('Geefcode')"
                label-for="input-22"
              >
                <b-form-input
                  id="input-22"
                  v-model="project_code"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Code"
                  aria-describedby="input-22-live-feedback"
                />
                <b-form-invalid-feedback id="input-22-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
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
// import { mapState, mapGetters } from 'vuex'
// import { addYears, differenceInYears } from 'date-fns'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'notAuthenticated',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  async asyncData ({ store, app, redirect }) {},
  data () {
    return {
      project_name: null,
      project_descr: null,
      project_type: null,
      project_code: null,
      project_lang: null,
      loading: false,
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
        }
      },
      mandatory_approvals: [],
      own_project: 'own',
      show: false,
      variant: 'success',
      message: this.$i18n.t('successReg'),
      languages: [
        { value: 'nl', text: 'Nederlands' },
        { value: 'fr', text: 'Frans' },
        { value: 'en', text: 'Engels' }
      ]
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
