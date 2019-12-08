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
              label="Email adres"
              label-for="input-3"
              description="We delen dit met niemand"
            >
              <b-form-input
                id="input-3"
                v-model="email"
                type="email"
                placeholder="email adres"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-3-live-feedback"
              />
              <b-form-invalid-feedback id="input-3-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
<<<<<<< HEAD
=======
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Birthyear">
            <b-form-group
              id="input-group-4"
              label="Geboortejaar"
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
              label="Geboortemaand"
              label-for="input-24"
            >
              <b-form-select v-model="month" :options="month_list" :state="errors[0] ? false : (valid ? true : null)" />
              <b-form-invalid-feedback id="input-24-live-feedback" :style="{ display: 'inline' }">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
>>>>>>> ff63bd28afdd8d66078621938bf0fad46ee90475
          <ValidationProvider v-slot="{ valid, errors }" rules="required|alpha_spaces" name="FirstName">
            <b-form-group
              id="input-group-5"
              label="Voornaam:"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="firstname"
                placeholder="Geef je voornaam in"
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
              label="Achternaam:"
              label-for="input-6"
            >
              <b-form-input
                id="input-6"
                v-model="lastname"
                placeholder="Geef je achternaam in"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-6-live-feedback"
              />
              <b-form-invalid-feedback id="input-6-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" :rules="{ required:true, between_dates: { min: beginYear, max: endYear } }" name="Birthmonth">
            <b-form-group
              id="input-group-4"
              label="Geboortemaand"
              label-for="input-4"
            >
              <YearMonth
                id="input-4"
                v-model="birthmonth"
                :event-date="startDateEvent"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-4-live-feedback"
                :min-age="minAge"
                :max-age="maxAge"
              />
              <b-form-invalid-feedback id="input-4-live-feedback" :style="{ display: 'inline' }">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Sex">
            <b-form-group
              id="input-group-7"
              label="Geslacht:"
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
              label="T-shirt maat:"
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
              label="Postcode"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="postalcode"
                placeholder="postcode"
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
              label="mobiel nummer (+32)"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="gsm"
                type="tel"
                placeholder="mobiel nummer"
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
              label="Van waar ken je ons:"
              label-for="input-10"
            >
              <b-form-input
                id="input-10"
                v-model="via"
                placeholder="Geef je dojo, school, ..."
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
                label="Zijn er aandoeningen of allergieën waar we rekening mee moeten houden:"
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
            <ValidationProvider v-slot="{ valid, errors }" name="GeneralQuestions">
              <b-form-group
                id="input-group-12"
                label="Algemene vragen:"
              >
                <b-form-checkbox-group
                  id="checkboxes-12"
                  v-model="general_questions"
                  :options="general_questions_list"
                  :checked="general_questions"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-12-live-feedback"
                />
                <b-form-invalid-feedback id="input-12-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
          <div v-else>
            <h2>Informatie van je ouders/voogd</h2>
            <ValidationProvider v-slot="{ valid, errors }" rules="required|email" name="Email">
              <b-form-group
                id="input-group-13"
                label="Email adres ouders/voogd"
                label-for="input-13"
                description="We delen dit met niemand"
              >
                <b-form-input
                  id="input-13"
                  v-model="email_guardian"
                  type="email"
                  placeholder="email adres"
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
                label="mobiel nummer ouders/voogd"
                label-for="input-14"
                description="Waar kunnen we jou bereiken in geval van nood"
              >
                <b-form-input
                  id="input-14"
                  v-model="gsm_guardian"
                  type="tel"
                  placeholder="mobiel nummer"
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
                label="Zijn er aandoeningen of allergieën waar we rekening mee moeten houden:"
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
                label="Is er nog extra informatie waar we rekening mee moeten houden:"
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
            <ValidationProvider v-slot="{ valid, errors }" name="GeneralQuestions">
              <b-form-group
                id="input-group-17"
                label="Algemene vragen"
              >
                <b-form-checkbox-group
                  id="checkboxes-17"
                  v-model="general_questions"
                  :checked="general_questions"
                  :options="general_questions_list"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-17-live-feedback"
                />
                <b-form-invalid-feedback id="input-17-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
          <h1>Project</h1>
          <b-form-group>
            <b-form-radio v-model="own_project" name="own_project" value="own">
              Ik heb mijn eigen project
            </b-form-radio>
            <b-form-radio v-model="own_project" name="own_project" value="other">
              Ik werk mee aan een bestaand project
            </b-form-radio>
          </b-form-group>
          <div v-if="isOwnProject">
            <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Language">
              <b-form-group
                id="input-group-18"
                label="Taal:"
                label-for="select-18"
                description="In welke taal wil je het project uitleggen aan de jury"
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
                label="Projecttype:"
                label-for="input-19"
                description="Selecteer wat je project allemaal doet, nodig heeft"
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
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:75" name="ProjectName">
              <b-form-group
                id="input-group-20"
                label="Projectnaam:"
                label-for="input-20"
              >
                <b-form-input
                  id="input-20"
                  v-model="project_name"
                  placeholder="Projectnaam"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-20-live-feedback"
                />
                <b-form-invalid-feedback id="input-20-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:200" name="ProjectDescription">
              <b-form-group
                id="input-group-21"
                label="Omschrijving:"
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
                label="Projectcode:"
                label-for="input-22"
                description="Geef de code in die je van de projecteigenaar gekregen hebt"
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
              description="Je moet akkoord gaan met volgende vragen om je te kunnen inschrijven"
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
      own_project: 'own',
      show: false,
      variant: 'success',
      message: 'De registratie is gelukt, je ontvangt zo dadelijk een mailtje waarmee je kan inloggen op onze website',
      month_list: [
        { text: 'Kies een maand', value: null },
        { value: 1, text: 'januari' },
        { value: 2, text: 'februari' },
        { value: 3, text: 'maart' },
        { value: 4, text: 'april' },
        { value: 5, text: 'mei' },
        { value: 6, text: 'juni' },
        { value: 7, text: 'juli' },
        { value: 8, text: 'augustus' },
        { value: 9, text: 'september' },
        { value: 10, text: 'oktober' },
        { value: 11, text: 'november' },
        { value: 12, text: 'december' }
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
        { text: 'Kies een jaar', value: null }
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
        await this.$axios.$post('/api/register', this.$store.getters['registration/sanitizedJSON'])
<<<<<<< HEAD
        this.error_variant = 'success'
        this.error_message = 'Je registratie is gelukt, je krijgt zo dadelijk een mailtje met meer informatie'
        this.error_show = true
        // this.onReset(evt)
      } catch (error) {
        this.error_variant = 'danger'
        this.error_message = error
        this.error_show = true
=======
        this.onReset(evt)
        this.variant = 'success'
        this.message = 'De registratie is gelukt, je ontvangt zo dadelijk een mailtje waarmee je kan inloggen op onze website'
        this.show = true
      } catch (error) {
        this.variant = 'danger'
        this.message = 'error, later komt hier meer info in'
        this.show = true
>>>>>>> ff63bd28afdd8d66078621938bf0fad46ee90475
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
    }
  }
}
</script>

<style></style>
<i18n>
{
  "en": {
    "title": "Registration",
    "personal_info": "Personal information"
  },
  "nl": {
    "title": "Registratie",
    "personal_info": "Persoonlijke informatie"
  }
}
</i18n>
