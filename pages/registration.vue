<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      <b-alert dismissible :show="show" :variant="variant">
        {{ message }}
      </b-alert>
      <h2>{{ $t('personal_info') }}</h2>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required|email" name="Email">
            <b-form-group
              id="input-group-3"
              :label="$t('Email adres:')"
              label-for="input-3"
              :description="$t('We delen dit met niemand')"
            >
              <b-form-input
                id="input-3"
                v-model="email"
                type="email"
                :placeholder="$t('Email adres:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-3-live-feedback"
              />
              <b-form-invalid-feedback id="input-3-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Birthyear">
            <b-form-group
              id="input-group-4"
              :label="$t('Geboortejaar:')"
              label-for="input-4"
            >
              <b-form-select v-model="year" :options="year_list" :state="errors[0] ? false : (valid ? true : null)" />
              <b-form-invalid-feedback id="input-4-live-feedback" :style="{ display: 'inline' }">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Birthmonth">
            <b-form-group
              id="input-group-24"
              :label="$t('Geboortemaand:')"
              label-for="input-24"
            >
              <b-form-select v-model="month" :options="month_list" :state="errors[0] ? false : (valid ? true : null)" />
              <b-form-invalid-feedback id="input-24-live-feedback" :style="{ display: 'inline' }">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="FirstName">
            <b-form-group
              id="input-group-5"
              :label="$t('Voornaam:')"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="firstname"
                :placeholder="$t('GeefVoornaam:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-5-live-feedback"
              />
              <b-form-invalid-feedback id="input-5-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="LastName">
            <b-form-group
              id="input-group-6"
              :label="$t('Achternaam:')"
              label-for="input-6"
            >
              <b-form-input
                id="input-6"
                v-model="lastname"
                :placeholder="$t('GeefAchternaam:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-6-live-feedback"
              />
              <b-form-invalid-feedback id="input-6-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Sex">
            <b-form-group
              id="input-group-7"
              :label="$t('Geslacht:')"
              label-for="input-7"
            >
              <b-form-select
                id="input-7"
                v-model="sex"
                :options="geslacht"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-7-live-feedback"
              />
              <b-form-invalid-feedback id="input-7-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="T-shirtSize">
            <b-form-group
              id="input-group-9"
              :label="$t('T-shirt maat:')"
              label-for="input-9"
            >
              <b-form-select
                id="input-9"
                v-model="t_size"
                :options="shirtsize"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-9-live-feedback"
              />
              <b-form-invalid-feedback id="input-9-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required|digits:4" name="PostalCode">
            <b-form-group
              id="input-group-1"
              :label="$t('Postcode:')"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="postalcode"
                :placeholder="$t('Postcode:')"
                type="number"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-1-live-feedback"
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" :rules="{ required: true, regex: /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/ }" name="MobileNumber">
            <b-form-group
              id="input-group-2"
              :label="$t('mobiel nummer (+32):')"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="gsm"
                type="tel"
                :placeholder="$t('mobiel nummer (+32):')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-2-live-feedback"
              />
              <b-form-invalid-feedback id="input-2-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" name="Via">
            <b-form-group
              id="input-group-10"
              :label="$t('Van waar ken je ons:')"
              label-for="input-10"
            >
              <b-form-input
                id="input-10"
                v-model="via"
                :placeholder="$t('Geef je dojo, school')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-10-live-feedback"
              />
              <b-form-invalid-feedback id="input-10-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <div v-if="!isGuardianNeeded">
            <ValidationProvider v-slot="{ valid, errors }" name="MedicalInfo">
              <b-form-group
                id="input-group-11"
                :label="$t('Zijn er aandoeningen')"
                label-for="input-11"
              >
                <b-form-textarea
                  id="input-11"
                  v-model="medical"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-11-live-feedback"
                />
                <b-form-invalid-feedback id="input-11-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <h2> {{ $t('Algemene vragen') }}</h2>
            <ValidationProvider v-slot="{ valid, errors }" rules="required" name="GeneralQuestions">
              <b-form-group
                id="input-group-12"
                :label="$t('no_photo')"
              >
                <b-form-radio-group
                  v-model="general_questions"
                  :state="errors[0] ? false : (valid ? true : null)"
                  :options="photo_options"
                  stacked
                >
                  <b-form-invalid-feedback id="input-12-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-radio-group>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="required" name="GeneralQuestions2">
              <b-form-group
                id="input-group-122"
                :label="$t('no_contact')"
              >
                <b-form-radio-group
                  v-model="general_questions2"
                  :state="errors[0] ? false : (valid ? true : null)"
                  :options="contact_options"
                  stacked
                >
                  <b-form-invalid-feedback id="input-122-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-radio-group>
              </b-form-group>
            </ValidationProvider>
          </div>
          <div v-else>
            <h2>{{ $t('Informatie van je ouders/voogd') }}</h2>
            <ValidationProvider v-slot="{ valid, errors }" rules="required|email" name="Email">
              <b-form-group
                id="input-group-13"
                :label="$t('Email adres ouders/voogd:')"
                label-for="input-13"
                de:description="$t('We delen dit met niemand')"
              >
                <b-form-input
                  id="input-13"
                  v-model="email_guardian"
                  type="email"
                  :placeholder="$t('Email adres ouders/voogd:')"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-13-live-feedback"
                />
                <b-form-invalid-feedback id="input-13-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" :rules="{ required: true, regex: /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/ }" name="Phone">
              <b-form-group
                id="input-group-14"
                :label="$t('mobiel nummer ouders/voogd')"
                label-for="input-14"
                :description="$t('Waar kunnen we jou bereiken in geval van nood')"
              >
                <b-form-input
                  id="input-14"
                  v-model="gsm_guardian"
                  type="tel"
                  :placeholder="$t('mobiel nummer ouders/voogd')"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-14-live-feedback"
                />
              </b-form-group>
              <b-form-invalid-feedback id="input-14-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" name="Medical">
              <b-form-group
                id="input-group-15"
                :label="$t('Zijn er aandoeningen')"
                label-for="input-15"
              >
                <b-form-textarea
                  id="input-15"
                  v-model="medical"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-15-live-feedback"
                />
                <b-form-invalid-feedback id="input-15-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" name="Extra">
              <b-form-group
                id="input-group-16"
                :label="$t('Is er nog extra informatie')"
                label-for="input-16"
              >
                <b-form-textarea
                  id="input-16"
                  v-model="extra"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-16-live-feedback"
                />
                <b-form-invalid-feedback id="input-16-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <h2> {{ $t('Algemene vragen') }}</h2>
            <ValidationProvider v-slot="{ valid, errors }" rules="required" name="GeneralQuestions">
              <b-form-group
                id="input-group-12"
                :label="$t('no_photo')"
              >
                <b-form-radio-group
                  v-model="general_questions"
                  :state="errors[0] ? false : (valid ? true : null)"
                  :options="photo_options"
                  stacked
                >
                  <b-form-invalid-feedback id="input-12-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-radio-group>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="required" name="GeneralQuestions2">
              <b-form-group
                id="input-group-122"
                :label="$t('no_contact')"
              >
                <b-form-radio-group
                  v-model="general_questions2"
                  :state="errors[0] ? false : (valid ? true : null)"
                  :options="contact_options"
                  stacked
                >
                  <b-form-invalid-feedback id="input-122-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-radio-group>
              </b-form-group>
            </ValidationProvider>
          </div>
          <h1> {{ $t('Project') }}</h1>
          <b-form-group>
            <b-form-radio v-model="own_project" name="own_project" value="own">
              {{ $t('eigenProject') }}
            </b-form-radio>
            <b-form-radio v-model="own_project" name="own_project" value="other">
              {{ $t('medeProject') }}
            </b-form-radio>
          </b-form-group>
          <div v-if="isOwnProject">
            <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Language">
              <b-form-group
                id="input-group-18"
                :label="$t('Taal:')"
                label-for="select-18"
                :description="$t('taalJury')"
              >
                <b-form-select
                  id="select-18"
                  v-model="project_lang"
                  :options="languages"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-18-live-feedback"
                />
                <b-form-invalid-feedback id="input-18-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="required" name="ProjectQuestions">
              <b-form-group
                id="input-group-19"
                :label="$t('Projecttype:')"
                label-for="input-19"
                :description="$t('Selecteer wat je project allemaal doet, nodig heeft')"
              >
                <b-form-checkbox-group
                  id="checkboxes-19"
                  v-model="project_type"
                  :options="project_types"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-19-live-feedback"
                />
                <b-form-invalid-feedback id="input-19-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:100" name="ProjectName">
              <b-form-group
                id="input-group-20"
                :label="$t('Projectnaam:')"
                label-for="input-20"
              >
                <b-form-input
                  id="input-20"
                  v-model="project_name"
                  :placeholder="$t('GeefProjectnaam:')"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-20-live-feedback"
                />
                <b-form-invalid-feedback id="input-20-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:500" name="ProjectDescription">
              <b-form-group
                id="input-group-21"
                :label="$t('Omschrijving:')"
                label-for="input-21"
              >
                <b-form-textarea
                  id="input-21"
                  v-model="project_descr"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-21-live-feedback"
                />
                <b-form-invalid-feedback id="input-21-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
          <div v-else>
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:36|min:36" name="ProjectCode">
              <b-form-group
                id="input-group-22"
                :label="$t('Projectcode:')"
                label-for="input-22"
                :description="$t('Geef de code in die je van de projecteigenaar gekregen hebt')"
              >
                <b-form-input
                  id="input-22"
                  v-model="project_code"
                  placeholder="Code"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-22-live-feedback"
                />
                <b-form-invalid-feedback id="input-22-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
          <ValidationProvider v-slot="{ valid, errors }" :rules="{required: true, all_true: mandatory_approvals}" name="ProjectName">
            <b-form-group
              :description="$t('Je moet akkoord')"
            >
              <b-form-checkbox-group
                id="checkboxes-23"
                v-model="mandatory_approvals"
                :options="mandatory_approvals_list"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-23-live-feedback"
              />
              <b-form-invalid-feedback id="input-23-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-form-group>
            <b-button
              type="submit"
              variant="info"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'paper-plane']" /> Ik schrijf me in
            </b-button>
            <b-button
              type="reset"
              variant="danger"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'trash-alt']" /> Verwijder alles
            </b-button>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
import addYears from 'date-fns/add_years'
import differenceInCalendarYears from 'date-fns/difference_in_calendar_years'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      photo_options: [
        { value: 'photo', text: this.$i18n.t('YESp') },
        { value: 'no_photo', text: this.$i18n.t('NOp') }
      ],
      contact_options: [
        { value: 'contact', text: this.$i18n.t('YESc') },
        { value: 'no_contact', text: this.$i18n.t('NOc') }
      ],
      own_project: 'own',
      show: false,
      variant: 'success',
      message: 'De registratie is gelukt, je ontvangt zo dadelijk een mailtje waarmee je kan inloggen op onze website',
      month_list: [
        { text: 'Kies een maand/Sélectionnez un mois/Select a month', value: null },
        { value: 0, text: 'januari/janvier/January' },
        { value: 1, text: 'februari/février/February' },
        { value: 2, text: 'maart/mars/March' },
        { value: 3, text: 'april/avril/April' },
        { value: 4, text: 'mei/mai/May' },
        { value: 5, text: 'juni/juni/June' },
        { value: 6, text: 'juli/juillet/July' },
        { value: 7, text: 'augustus/ao t/August' },
        { value: 8, text: 'september/septembre/September' },
        { value: 9, text: 'oktober/octobre/October' },
        { value: 10, text: 'november/novembre/November' },
        { value: 11, text: 'december/décembre/December' }
      ],
      year: null,
      month: null
    }
  },
  asyncData ({ store }) {
    let date = store.state.registration.birthmonth
    let year = null
    let month = null
    if (date instanceof Date === false && date !== null) {
      date = new Date(date)
    }
    if (date !== null) {
      year = date.getFullYear()
      month = date.getMonth()
    }
    return {
      year,
      month
    }
  },
  computed: {
    year_list: () => {
      const yearStart = 2002
      const yearEnd = 2014
      const yearList = [
        { text: 'Kies een jaar/Choisissez une année/Choose a year', value: null }
      ]
      for (let i = 0; i < yearEnd - yearStart; i++) {
        yearList.push({ text: yearStart + i, value: yearStart + i })
      }
      return yearList
    },
    endDate: (state) => {
      return addYears(state.startDateEvent, -5)
    },
    isGuardianNeeded: (state) => {
      return differenceInCalendarYears(state.startDateEvent, state.birthmonth) < 16
    },
    isOwnProject: (state) => {
      return state.own_project === 'own'
    },
    beginYear: (state) => {
      return addYears(state.startDateEvent, state.maxAge * -1)
    },
    endYear: (state) => {
      return addYears(state.startDateEvent, state.minAge * -1)
    },
    ...mapState([
      'startDateEvent',
      'maxAge',
      'minAge',
      'geslacht',
      'shirtsize',
      'project_types',
      'languages',
      'general_questions_list',
      'mandatory_approvals_list'
    ]),
    ...mapState('registration', [
      'birthmonth'
    ]),
    postalcode: {
      set (value) {
        this.$store.dispatch('registration/postalcode', value)
      },
      get () {
        return this.$store.state.registration.postalcode
      }
    },
    email: {
      set (value) {
        this.$store.dispatch('registration/email', value)
      },
      get () {
        return this.$store.state.registration.email
      }
    },
    firstname: {
      set (value) {
        this.$store.dispatch('registration/firstname', value)
      },
      get () {
        return this.$store.state.registration.firstname
      }
    },
    lastname: {
      set (value) {
        this.$store.dispatch('registration/lastname', value)
      },
      get () {
        return this.$store.state.registration.lastname
      }
    },
    sex: {
      set (value) {
        this.$store.dispatch('registration/sex', value)
      },
      get () {
        return this.$store.state.registration.sex
      }
    },
    general_questions: {
      set (value) {
        this.$store.dispatch('registration/general_questions', value)
      },
      get () {
        return this.$store.state.registration.general_questions
      }
    },
    general_questions2: {
      set (value) {
        this.$store.dispatch('registration/general_questions2', value)
      },
      get () {
        return this.$store.state.registration.general_questions2
      }
    },
    mandatory_approvals: {
      set (value) {
        this.$store.dispatch('registration/mandatory_approvals', value)
      },
      get () {
        return this.$store.state.registration.mandatory_approvals
      }
    },
    t_size: {
      set (value) {
        this.$store.dispatch('registration/t_size', value)
      },
      get () {
        return this.$store.state.registration.t_size
      }
    },
    via: {
      set (value) {
        this.$store.dispatch('registration/via', value)
      },
      get () {
        return this.$store.state.registration.via
      }
    },
    medical: {
      set (value) {
        this.$store.dispatch('registration/medical', value)
      },
      get () {
        return this.$store.state.registration.medical
      }
    },
    extra: {
      set (value) {
        this.$store.dispatch('registration/extra', value)
      },
      get () {
        return this.$store.state.registration.extra
      }
    },
    project_name: {
      set (value) {
        this.$store.dispatch('registration/project_name', value)
      },
      get () {
        return this.$store.state.registration.project_name
      }
    },
    project_descr: {
      set (value) {
        this.$store.dispatch('registration/project_descr', value)
      },
      get () {
        return this.$store.state.registration.project_descr
      }
    },
    project_type: {
      set (value) {
        this.$store.dispatch('registration/project_type', value)
      },
      get () {
        return this.$store.state.registration.project_type
      }
    },
    project_code: {
      set (value) {
        this.$store.dispatch('registration/project_code', value)
      },
      get () {
        return this.$store.state.registration.project_code
      }
    },
    project_lang: {
      set (value) {
        this.$store.dispatch('registration/project_lang', value)
      },
      get () {
        return this.$store.state.registration.project_lang
      }
    },
    gsm: {
      set (value) {
        this.$store.dispatch('registration/gsm', value)
      },
      get () {
        return this.$store.state.registration.gsm
      }
    },
    gsm_guardian: {
      set (value) {
        this.$store.dispatch('registration/gsm_guardian', value)
      },
      get () {
        return this.$store.state.registration.gsm_guardian
      }
    },
    email_guardian: {
      set (value) {
        this.$store.dispatch('registration/email_guardian', value)
      },
      get () {
        return this.$store.state.registration.email_guardian
      }
    }
  },
  methods: {
    async onSubmit (evt) {
      try {
        // pass language to store
        this.$store.dispatch('registration/language', this.$i18n.locale)
        await this.$axios.$post('/api/register', this.$store.getters['registration/sanitizedJSON'])
        // this.onReset(evt)
        this.variant = 'success'
        this.message = 'De registratie is gelukt, je ontvangt zo dadelijk een mailtje waarmee je kan inloggen op onze website'
        this.show = true
      } catch (error) {
        this.variant = 'danger'
        this.message = 'error, later komt hier meer info in'
        this.show = true
      }
      window.scrollTo(0, 0)
    },
    onReset (evt) {
      this.$store.dispatch('registration/clear_form')
      this.year = this.month = null // clean temp fields
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  },
  watch: {
    year (val) {
      let date = this.$store.state.registration.birthmonth
      if (date === null) {
        date = new Date()
      }
      if (typeof date === 'string') {
        date = new Date(date)
      }
      date.setDate(1)
      date.setFullYear(val)
      this.$store.dispatch('registration/birthmonth', date)
    },
    month (val) {
      let date = this.$store.state.registration.birthmonth
      if (date === null) {
        date = new Date()
      }
      if (typeof date === 'string') {
        date = new Date(date)
      }
      date.setDate(1)
      date.setMonth(val)
      this.$store.dispatch('registration/birthmonth', date)
    },
    own_project (val) {
      // cleanup data
      if (val === 'own') {
        this.project_code = null
      } else {
        this.project_name = null
        this.project_descr = null
        this.project_type = null
        this.project_lang = null
      }
    }
  }
}
</script>

<style></style>
<i18n>
{
  "en": {
    "title": "Registration",
    "personal_info": "Personal information",
    "no_photo": "I allow to take pictures of me",
    "no_contact": "I allow to contact me for future events",
    "YESp": "Yes",
    "NOp": "No",
    "YESc": "Yes",
    "NOc": "No",
    "Informatie van je ouders/voogd": "Information from your parents / guardian",
    "Algemene vragen": "General Questions",
    "Project": "Project",
    "eigenProject": "I have my own project",
    "medeProject": "I participate in an existing project",
    "taalJury": "In which language do you want to explain the project to the jury?",
    "We delen dit met niemand": "We do not share this with anyone",
    "Waar kunnen we jou bereiken in geval van nood": "Where can we reach you in an emergency?",
    "Selecteer wat je project allemaal doet, nodig heeft": "Select what your project does, needs",
    "Geef de code in die je van de projecteigenaar gekregen hebt": "Enter the code that you received from the project owner",
    "Je moet akkoord": "You must agree to the following question in order to register",
    "Email adres:": "E-mail address",
    "Geboortejaar:": "Year of birth:",
    "Geboortemaand:": "Birth month:",
    "Voornaam:": "First Name:",
    "Achternaam:": "Last Name:",
    "Geslacht:": "I am a ..:",
    "T-shirt maat:": "T-shirt size:",
    "Postcode:": "Postal Code:",
    "mobiel nummer (+32):": "mobile number (+32):",
    "Van waar ken je ons:": "Where do you know us:",
    "Zijn er aandoeningen": "Are there any conditions or allergies that we should take into account:",
    "Email adres ouders/voogd:": "Email address parents / guardian:",
    "mobiel nummer ouders/voogd": "mobile number parents / guardian",
    "Is er nog extra informatie": "Is there any additional information that we must take into account:",
    "Taal:": "Language:",
    "Projecttype:": "Project type:",
    "Projectnaam:": "Project name:",
    "Omschrijving:": "Description:",
    "Projectcode:": "Project code:",
    "GeefVoornaam:": "Enter your first name",
    "GeefAchternaam:": "Enter your last name",
    "Geef je dojo, school": "Give your dojo, school, ..",
    "GeefProjectnaam:": "Enter project name:"
  },
  "fr": {
    "title": "Enregistrement",
    "personal_info": "Informations personnelles",
    "no_photo": "Je permets de prendre des photos",
    "no_contact": "Je permets de me contacter pour de futurs événements",
    "YESp": "oui",
    "NOp": "non",
    "YESc": "oui",
    "NOc": "non",
    "Informatie van je ouders/voogd": "Informations de vos parents / tuteurs",
    "Algemene vragen": "Questions d'ordre général",
    "Project": "Projet",
    "eigenProject": "J'ai mon propre projet",
    "medeProject": "Je participe à un projet existant",
    "taalJury": "Dans quelle langue souhaitez-vous expliquer le projet au jury?",
    "We delen dit met niemand": "Nous ne partageons cela avec personne",
    "Waar kunnen we jou bereiken in geval van nood": "Où pouvons-nous vous joindre en cas d'urgence?",
    "Selecteer wat je project allemaal doet, nodig heeft": "Sélectionnez ce que votre projet fait, a besoin",
    "Geef de code in die je van de projecteigenaar gekregen hebt": "Entrez le code que vous avez reçu du propriétaire du projet",
    "Je moet akkoord": "Vous devez accepter la question suivante pour vous inscrire",
    "Email adres:": "Adresse e-mail",
    "Geboortejaar:": "Année de naissance:",
    "Geboortemaand:": "Mois de naissance:",
    "Voornaam:": "Prénom:",
    "Achternaam:": "nom de famille:",
    "Geslacht:": "Je suis un(e)..:",
    "T-shirt maat:": "T-shirt taille:",
    "Postcode:": "Code postal:",
    "mobiel nummer (+32):": "numéro de portable (+32):",
    "Van waar ken je ons:": "Où nous connaissez-vous?:",
    "Zijn er aandoeningen": "Y a-t-il des conditions ou des allergies dont nous devons tenir compte:",
    "Email adres ouders/voogd:": "Adresse e-mail parents / tuteur:",
    "mobiel nummer ouders/voogd": "parents / tuteurs du numéro de portable",
    "Is er nog extra informatie": "Existe-t-il des informations supplémentaires dont nous devrions tenir compte:",
    "Taal:": "Langue:",
    "Projecttype:": "Type de projet:",
    "Projectnaam:": "Nom du projet:",
    "Omschrijving:": "Description:",
    "Projectcode:": "Code de projet:",
    "GeefVoornaam:": "Entrez votre prénom",
    "GeefAchternaam:": "Entrez votre nom de famille",
    "Geef je dojo, school": "Donnez votre dojo, école, ..",
    "GeefProjectnaam:": "Entrez le nom du projet"
  },
  "nl": {
    "title": "Registratie",
    "personal_info": "Persoonlijke informatie",
    "no_photo": "CoderDojo is leuk en daarom tonen wij graag waar we mee bezig zijn. Het is mogelijk dat de deelnemer tijdens een sessie gefotografeerd of gefilmd wordt.",
    "no_contact": "We respecteren je data. Bekijk daarom zeker even ons privacy statement op de website. Mogen we jou via mail op de hoogte brengen over volgende Coolest Projects evenementen?",
    "YESp": "Dat is geen probleem",
    "NOp": "Gelieve geen foto’s en filmpjes te gebruiken waarop de deelnemer herkenbaar is",
    "YESc": "Je mag mij contacteren wanneer ik kan inschrijven voor een volgende evenement",
    "NOc": "Bewaar mijn data niet en contacteer mij niet",
    "Informatie van je ouders/voogd":"Informatie van je ouders/voogd",
    "Algemene vragen": "Algemeine vragen",
    "Project": "Project",
    "eigenProject": "Ik heb mijn eigen project",
    "medeProject": "Ik werk mee aan een bestaand project",
    "taalJury": "In welke taal wil je het project uitleggen aan de jury?",
    "We delen dit met niemand": "We delen dit met niemand",
    "Waar kunnen we jou bereiken in geval van nood": "Waar kunnen we jou bereiken in geval van nood?",
    "Selecteer wat je project allemaal doet, nodig heeft": "Selecteer wat je project allemaal doet, nodig heeft",
    "Geef de code in die je van de projecteigenaar gekregen hebt": "Geef de code in die je van de projecteigenaar gekregen hebt",
    "Je moet akkoord": "Je moet akkoord gaan met volgende vraag om je te kunnen inschrijven",
    "Email adres:": "Email adres",
    "Geboortejaar:": "Geboortejaar:",
    "Geboortemaand:": "Geboortemaand:",
    "Voornaam:": "Voornaam:",
    "Achternaam:": "Achternaam:",
    "Geslacht:": "Ik ben een..:",
    "T-shirt maat:": "T-shirt maat:",
    "Postcode:": "Postcode:",
    "mobiel nummer (+32):": "mobiel nummer (+32):",
    "Van waar ken je ons:": "Van waar ken je ons:",
    "Zijn er aandoeningen": "Zijn er aandoeningen of allergieën waar we rekening mee moeten houden:",
    "Email adres ouders/voogd:": "Email adres ouders/voogd:",
    "mobiel nummer ouders/voogd": "mobiel nummer ouders/voogd",
    "Is er nog extra informatie": "Is er nog extra informatie waar we rekening mee moeten houden:",
    "Taal:": "Taal:",
    "Projecttype:": "Projecttype:",
    "Projectnaam:": "Projectnaam:",
    "Omschrijving:": "Omschrijving:",
    "Projectcode:": "Projectcode:",
    "GeefAchternaam:": "Geef je achternaam in",
    "GeefVoornaam:": "Geef je voornaam in:",
    "Geef je dojo, school": "Geef je dojo, school, ..",
    "GeefProjectnaam:": "Geef project naam:"
  }
}
</i18n>
