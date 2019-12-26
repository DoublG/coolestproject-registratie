<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <b-form-group
            id="input-group-1"
            :label="$t('Email adress:')"
            label-for="input-1"
          >
            {{ email }}
          </b-form-group>
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
          <ValidationProvider v-slot="{ valid, errors }" :rules="{ required: true, between_dates: { month: month, min: minAgeDate, max: maxAgeDate } }" name="Birthyear">
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
          <ValidationProvider v-slot="{ valid, errors }" :rules="{ required: true, between_dates: { year: year, min: minAgeDate, max: maxAgeDate } }" name="Birthmonth">
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
          <div>
            <b-button
              class="button-sm"
              pill
              variant="info"
              href="https://www.kindermaten.com/pages/Maattabel.html/"
              target="_blank"
            >
              INFO
            </b-button>
          </div>
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
          <ValidationProvider v-slot="{ valid, errors }" :rules="{ required: true, regex: /^((\+|00)32\s?|0)([1-9][0-9]\d{6})\d?$/ }" name="MobileNumber">
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
            <ValidationProvider v-slot="{ valid, errors }" :rules="{ required: true, regex: /^((\+|00)32\s?|0)([1-9][0-9]\d{6})\d?$/ }" name="Phone">
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
          <b-form-group>
            <b-button
              type="submit"
              variant="info"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'user-edit']" /> {{ $t('Aanpassen') }}
            </b-button>
            <b-button
              type="reset"
              variant="warning"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'trash-restore']" />  {{ $t('Resetten') }}
            </b-button>
            <b-button
              type="button"
              variant="danger"
              class="button-hero"
              @click="onDeleteInfo"
            >
              <font-awesome-icon :icon="['fas', 'user-minus']" />  {{ $t('Delete') }}
            </b-button>
            <b-modal v-model="deleteInfo" ok-title="Delete" @ok="onDelete">
              Opgelet: als je bevestigt wordt jouw gebruiker verwijderd dat will zeggen dat al jouw Personlijke en Project informatie worden verwijderd
              ...Als je toch nog wilt meedoen dan kan je via Registratie een nieuw project aanmaken of bij een andere project meedoen.
            </b-modal>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import addYears from 'date-fns/add_years'
import differenceInCalendarYears from 'date-fns/difference_in_calendar_years'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'authenticated',
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
      show: false,
      variant: 'success',
      message: this.$i18n.t('successReg'),
      month_list: [
        { text: this.$i18n.t('Kiesmaand'), value: null },
        { value: 0, text: this.$i18n.t('januari') },
        { value: 1, text: this.$i18n.t('februari') },
        { value: 2, text: this.$i18n.t('maart') },
        { value: 3, text: this.$i18n.t('april') },
        { value: 4, text: this.$i18n.t('mei') },
        { value: 5, text: this.$i18n.t('juni') },
        { value: 6, text: this.$i18n.t('juli') },
        { value: 7, text: this.$i18n.t('augustus') },
        { value: 8, text: this.$i18n.t('september') },
        { value: 9, text: this.$i18n.t('october') },
        { value: 10, text: this.$i18n.t('november') },
        { value: 11, text: this.$i18n.t('december') }
      ],
      year: null,
      month: null,
      geslacht: [
        { text: this.$i18n.t('Ik ben een'), value: null },
        { value: 'f', text: this.$i18n.t('meisje') },
        { value: 'm', text: this.$i18n.t('jongen') },
        { value: 'x', text: 'X' }
      ],
      languages: [
        { value: 'nl', text: 'Nederlands' },
        { value: 'fr', text: 'Frans' },
        { value: 'en', text: 'Engels' }
      ],
      general_questions_fotos: [
        { value: 'photo', text: 'Ik ben akkoord dat er fotos genomen worden' }
      ],
      general_questions_contact: [
        { value: 'contact', text: 'Je mag me contacteren voor de volgende events' }
      ],
      shirtsize: [
        { text: this.$i18n.t('kiesmaat'), value: null },
        // Meisje/Fille/Girl
        { value: 'female_M116', text: this.$i18n.t('meisje') + ' M116' },
        { value: 'female_M122', text: this.$i18n.t('meisje') + ' M122' },
        { value: 'female_M128', text: this.$i18n.t('meisje') + ' M128' },
        { value: 'female_M134', text: this.$i18n.t('meisje') + ' M134' },
        { value: 'female_M140', text: this.$i18n.t('meisje') + ' M140' },
        { value: 'female_M146', text: this.$i18n.t('meisje') + ' M146' },
        { value: 'female_M152', text: this.$i18n.t('meisje') + ' M152' },
        { value: 'female_M158', text: this.$i18n.t('meisje') + ' M158' },
        { value: 'female_M164', text: this.$i18n.t('meisje') + ' M164' },
        { value: 'female_M170', text: this.$i18n.t('meisje') + ' M170' },
        { value: 'female_M176', text: this.$i18n.t('meisje') + ' M176' },
        { value: 'female_medium', text: this.$i18n.t('meisje') + ' 94 62.. Medium' },
        { value: 'female_large', text: this.$i18n.t('meisje') + ' 100 64.. Large' },
        { value: 'female_xl', text: this.$i18n.t('meisje') + ' 106 66.. XL extra large' },
        // Jongen/Garçon/Boy
        { value: 'male_M116', text: this.$i18n.t('jongen') + ' M116' },
        { value: 'male_M122', text: this.$i18n.t('jongen') + ' M122' },
        { value: 'male_M128', text: this.$i18n.t('jongen') + ' M128' },
        { value: 'male_M134', text: this.$i18n.t('jongen') + ' M134' },
        { value: 'male_M140', text: this.$i18n.t('jongen') + ' M140' },
        { value: 'male_M146', text: this.$i18n.t('jongen') + ' M146' },
        { value: 'male_M152', text: this.$i18n.t('jongen') + ' M152' },
        { value: 'male_M158', text: this.$i18n.t('jongen') + ' M158' },
        { value: 'male_M164', text: this.$i18n.t('jongen') + ' M164' },
        { value: 'male_M170', text: this.$i18n.t('jongen') + ' M170' },
        { value: 'male_M176', text: this.$i18n.t('jongen') + ' M176' },
        { value: 'male_Xsmall', text: this.$i18n.t('jongen') + ' 90 68.. XS' },
        { value: 'male_small', text: this.$i18n.t('jongen') + ' 96 70..  S' },
        { value: 'male_medium', text: this.$i18n.t('jongen') + ' 102 72..   M' },
        { value: 'male_large', text: this.$i18n.t('jongen') + ' 108 74..   L' },
        { value: 'male_xl', text: this.$i18n.t('jongen') + ' 114 76..   XL' },
        { value: 'male_xxl', text: this.$i18n.t('jongen') + ' 120 78..   XXL' },
        { value: 'male_3xl', text: this.$i18n.t('jongen') + ' 126 80..   3XL' }
      ],
      deleteInfo: false
    }
  },
  computed: {
    firstname: {
      set (value) {
        this.$store.commit('user/firstname', value)
      },
      get () {
        return this.$store.state.user.firstname
      }
    },
    lastname: {
      set (value) {
        this.$store.commit('user/lastname', value)
      },
      get () {
        return this.$store.state.user.lastname
      }
    },
    year_list: (app) => {
      const yearStart = app.beginYear.getFullYear()
      const yearEnd = app.endYear.getFullYear()
      const yearList = [
        { text: app.$i18n.t('year'), value: null }
      ]
      for (let i = 0; i <= yearEnd - yearStart; i++) {
        yearList.push({ text: yearStart + i, value: yearStart + i })
      }
      return yearList
    },
    endDate: (state) => {
      return addYears(state.startDateEvent, -5)
    },
    isGuardianNeeded: (state) => {
      return differenceInCalendarYears(state.startDateEvent, new Date(state.year, state.month, 1)) < state.guardianAge
    },
    beginYear: (state) => {
      return addYears(state.startDateEvent, state.maxAge * -1)
    },
    endYear: (state) => {
      return addYears(state.startDateEvent, state.minAge * -1)
    },
    ...mapState('user', [
      'language',
      'email',
      'postalcode',
      'birthmonth',
      'gsm',
      'startDateEvent',
      'maxAge',
      'minAge',
      'guardianAge'
    ]),
    birthmonth: {
      set (value) {
        this.$store.dispatch('user/birthmonth', value)
      },
      get () {
        return this.$store.state.user.birthmonth
      }
    },
    postalcode: {
      set (value) {
        this.$store.dispatch('user/postalcode', value)
      },
      get () {
        return this.$store.state.user.postalcode
      }
    },
    email: {
      set (value) {
        this.$store.dispatch('user/email', value)
      },
      get () {
        return this.$store.state.user.email
      }
    },
    sex: {
      set (value) {
        this.$store.dispatch('user/sex', value)
      },
      get () {
        return this.$store.state.user.sex
      }
    },
    general_questions: {
      set (value) {
        this.$store.dispatch('user/general_questions', value)
      },
      get () {
        return this.$store.state.user.general_questions
      }
    },
    general_questions2: {
      set (value) {
        this.$store.dispatch('user/general_questions2', value)
      },
      get () {
        return this.$store.state.user.general_questions2
      }
    },
    mandatory_approvals: {
      set (value) {
        this.$store.dispatch('user/mandatory_approvals', value)
      },
      get () {
        return this.$store.state.user.mandatory_approvals
      }
    },
    t_size: {
      set (value) {
        this.$store.dispatch('user/t_size', value)
      },
      get () {
        return this.$store.state.user.t_size
      }
    },
    via: {
      set (value) {
        this.$store.dispatch('user/via', value)
      },
      get () {
        return this.$store.state.user.via
      }
    },
    medical: {
      set (value) {
        this.$store.dispatch('user/medical', value)
      },
      get () {
        return this.$store.state.user.medical
      }
    },
    extra: {
      set (value) {
        this.$store.dispatch('registration/extra', value)
      },
      get () {
        return this.$store.state.user.extra
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
  async asyncData ({ store, query, app, redirect, route }) {
    // load userdata & store in userstore
    const userData = await axios.get('/api/userinfo', { headers: { api_key: store.state.auth.api_key } })
    await store.dispatch('user/updateUser', userData.data)
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ]),
    async onSubmit (evt) {
      try {
        const userData = await this.$axios.$patch('/api/userinfo', this.$store.getters['user/userinfo'], { headers: { api_key: this.$store.state.auth.api_key } })
        await this.$store.dispatch('user/updateUser', userData)
      } catch (error) {
        this.variant = 'danger'
        this.message = this.$i18n.t('failedReg')
        this.show = true
      }
      window.scrollTo(0, 0)
    },
    async onReset (evt) {
      const userData = await this.$axios.$get('/api/userinfo', { headers: { api_key: this.$store.state.auth.api_key } })
      await this.$store.dispatch('user/updateUser', userData)
    },
    onDeleteInfo (evt) {
      this.deleteInfo = true
    },
    async onDelete (evt) {
      await this.$axios.$delete('/api/userinfo', { headers: { api_key: this.$store.state.auth.api_key } })
      this.logout()
      this.$router.go({ path: './login' })
    }
  }
}
</script>

<i18n>
{
  "en": {
    "failedReg": "Registration failed, try again later",
    "title": "User",
    "personal_info": "Personal information",
    "no_photo": "CoderDojo is fun so we like sharing that with the world. During our activities, we take pictures that may appear on social media afterwards so it could be the case that you get photographed or filmed during one of these CoderDojo activities. We don't use this footage on flyers or campaign without explicitly asking for permission. If you rather don't want your picture to be used, you can mention this at your registration.",
    "no_contact": "You can contact me for future events",
    "YESp": "Yes",
    "NOp": "No",
    "YESc": "Yes",
    "NOc": "No",
    "Informatie van je ouders/voogd": "Your parents / guardian info",
    "Algemene vragen": "General Questions",
    "Project": "Project",
    "eigenProject": "I have my own project",
    "medeProject": "I participate in an existing project",
    "taalJury": "In which language do you want to explain the project to the jury?",
    "We delen dit met niemand": "We don’t share this with anyone",
    "Waar kunnen we jou bereiken in geval van nood": "Where can we reach you in case of an emergency?",
    "Selecteer wat je project allemaal doet, nodig heeft": "Select what your project does, needs",
    "Geef de code in die je van de projecteigenaar gekregen hebt": "Enter the code that you received from the project owner",
    "Je moet akkoord": "You must agree to the following question in order to register",
    "E-mail adres:": "E-mail address",
    "Geboortejaar:": "Year of birth:",
    "Geboortemaand:": "Birth month:",
    "Voornaam:": "First Name:",
    "Achternaam:": "Last Name:",
    "Geslacht:": "I am a ..:",
    "T-shirt maat:": "T-shirt size:",
    "Postcode:": "Postal Code:",
    "mobiel nummer (+32):": "mobile number (+32):",
    "Van waar ken je ons:": "Where do you know us from:",
    "Zijn er aandoeningen": "Are there any conditions or allergies that we should take into account:",
    "E-mail adres ouders/voogd:": "E-mail address parents / guardian:",
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
    "GeefProjectnaam:": "Enter project name:",
    "januari": "January",
    "februari": "February",
    "maart": "March",
    "april": "April",
    "mei": "May",
    "juni": "June",
    "juli": "July",
    "augustus": "August",
    "september": "September",
    "oktober": "October",
    "november": "November",
    "december": "December",
    "Kiesmaand": "Select a month",
    "Ik ben een": "I am a..",
    "meisje": "Girl",
    "jongen": "Boy",
    "kiesmaat": "Choose a size",
    "Ik schrijf me in": "I register",
    "verwijder alles": "delete all",
    "successReg": "Registration is successful, you will receive an email shortly with which you can log in to our website",
    "Ikbenakkoord": "I agree with the general conditions",
    "Project_Type": "What is in your project about hardware, software, network on WiFi or on cable,...."
  },
  "fr": {
    "failedReg": "L'enregistrement a échoué, réessayez plus tard",
    "title": "Utilisateur",
    "personal_info": "Informations personnelles",
    "no_photo": "Nous aimons promotionner notre action à travers les réseaux sociaux et pour ce faire nous prenons des photos pendant nos événements.Sachez que tu pourrait être photographié ou filmé lors de sa participation à notre evenement. Ces photos sont ensuite postées et partagées sur nos réseaux sociaux. Celles-ci ne sont pas imprimées, et ne figurent pas sur nos brochures. Si toutes fois, quelques photos devaient servir à des fins de campagnes promotionnelles plus étendues, nous vous demanderons bien sûr votre accord avant diffusion. Si vous ne tenez pas à ce que les photos de vous soient utilisées, nous vous remercions de nous en faire part lors de votre enregistrement.",
    "no_contact": "Nous respectons vos données personnelles ! Pour plus d’infos, consultez notre clause de confidentialité sur notre site web.Pouvons-nous vous informer des événements Coolest Projects ultérieurs par e-mail?",
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
    "Van waar ken je ons:": "d’ Où vous connaissez nous?:",
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
    "GeefProjectnaam:": "Entrez le nom du projet",
    "januari": "janvier",
    "februari": "février",
    "maart": "mars",
    "april": "avril",
    "mei": "mai",
    "juni": "juin",
    "juli": "juillet",
    "augustus": "août",
    "september": "septembre",
    "oktober": "octobre",
    "november": "novembre",
    "december": "décembre",
    "Kiesmaand": "Sélectionnez un mois",
    "Kiesjaar": "Sélectionnez une année",
    "Ik ben een": "Je suis un(e)..",
    "meisje": "Fille",
    "jongen": "Garçon",
    "kiesmaat": "Choisissez une taille",
    "Ik schrijf me in": "Je m'inscris",
    "verwijder alles": "tout supprimer",
    "successReg": "L'inscription est réussie, vous recevrez sous peu un e-mail avec lequel vous pourrez vous connecter à notre site Web",
    "Ikbenakkoord": "Vous devez accepter la question suivante pour vous inscrire",
    "Project_Type": "Quel est dans votre projet matériel, logiciel, réseau sur WiFi ou sur câble,...."
  },
  "nl": {
    "failedReg": "Registratie mislukt, probeer later nog eens opnieuw",
    "title": "Gebruiker",
    "personal_info": "Persoonlijke informatie",
    "no_photo": "CoderDojo is leuk en daarom tonen wij graag waar we mee bezig zijn. We nemen tijdens onze activiteiten foto’s van onze deelnemers en begeleiders die we daarna op sociale media plaatsen. Het kan gebeuren dat je gefotografeerd of gefilmd wordt tijdens ons event. Wij gebruiken dit beeldmateriaal niet op flyers of voor uitvoerige campagnes zonder hiervoor nog eens expliciet toestemming te vragen. Indien je liever geen foto’s van je gebruikt ziet worden, kan je dat tijdens het registreren aangeven.",
    "no_contact": "We respecteren je data. Bekijk daarom zeker even ons privacy statement op de website. Mogen we jou via mail op de hoogte brengen over volgende Coolest Projects evenementen?",
    "YESp": "Dat is geen probleem",
    "NOp": "Gelieve geen foto’s en filmpjes te gebruiken waarop de deelnemer herkenbaar is",
    "YESc": "Je mag mij contacteren wanneer ik kan inschrijven voor een volgende evenement",
    "NOc": "Bewaar mijn data niet en contacteer mij niet",
    "Informatie van je ouders/voogd":"Informatie van je ouders/voogd",
    "Algemene vragen": "Algemene vragen",
    "Project": "Project",
    "eigenProject": "Ik heb mijn eigen project",
    "medeProject": "Ik werk mee aan een bestaand project",
    "taalJury": "In welke taal wil je het project uitleggen aan de jury?",
    "We delen dit met niemand": "We delen dit met niemand",
    "Waar kunnen we jou bereiken in geval van nood": "Waar kunnen we jou bereiken in geval van nood?",
    "Selecteer wat je project allemaal doet, nodig heeft": "Selecteer wat je project allemaal doet, nodig heeft",
    "Geef de code in die je van de projecteigenaar gekregen hebt": "Geef de code in die je van de projecteigenaar gekregen hebt",
    "Je moet akkoord": "Je moet akkoord gaan met volgende vraag om je te kunnen inschrijven",
    "Email adres:": "E-mail adres",
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
    "Email adres ouders/voogd:": "E-mail adres ouders/voogd:",
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
    "GeefProjectnaam:": "Geef project naam:",
    "januari": "januari",
    "februari": "februari",
    "maart": "maart",
    "april": "april",
    "mei": "mei",
    "juni": "juni",
    "juli": "juli",
    "augustus": "augustus",
    "september": "september",
    "oktober": "october",
    "november": "november",
    "december": "december",
    "Kiesmaand": "Kies een maand",
    "Kiesjaar": "Kies een jaar",
    "Ik ben een": "Ik ben een..",
    "meisje": "Meisje",
    "jongen": "Jongen",
    "kiesmaat": "Kies een maat",
    "Ik schrijf me in": "Ik schrijf me in",
    "verwijder alles": "VERWIJDER ALLES",
    "successReg": "De registratie is gelukt, je ontvangt zo dadelijk een mailtje waarmee je kan inloggen op onze website",
    "Ikbenakkoord": "Ik ben akkoord met de algemene voorwarden",
    "Project_Type": "Wat zit er in jouw project aan hardwere, software, netwerk via wifi of via kabel,...."
  }
  }
</i18n>

<style>
</style>
