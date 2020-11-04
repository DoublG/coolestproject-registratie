<template>
  <b-row>
    <b-col>
      <h1>{{ $t("titleUser") }}</h1>
      <b-alert :show="show" :variant="variant" dismissible>
        {{ message }}
      </b-alert>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <b-form-group
            id="input-group-1"
            :label="$t('Email adress:')"
            label-for="input-1"
          >
            <b-form-input id="input-1" v-model="email" disabled />
          </b-form-group>
          <ValidationProvider
            v-slot="{ valid, errors }"
            rules="required"
            name="FirstName"
          >
            <b-form-group
              id="input-group-5"
              :label="$t('Voornaam:')"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="firstname"
                :placeholder="$t('GeefVoornaam:')"
                :state="errors[0] ? false : valid ? true : null"
                aria-describedby="input-5-live-feedback"
              />
              <b-form-invalid-feedback id="input-5-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, errors }"
            rules="required"
            name="LastName"
          >
            <b-form-group
              id="input-group-6"
              :label="$t('Achternaam:')"
              label-for="input-6"
            >
              <b-form-input
                id="input-6"
                v-model="lastname"
                :placeholder="$t('GeefAchternaam:')"
                :state="errors[0] ? false : valid ? true : null"
                aria-describedby="input-6-live-feedback"
              />
              <b-form-invalid-feedback id="input-6-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, errors }"
            :rules="{
              required: true,
              between_dates: { month: month, min: minAgeDate, max: maxAgeDate },
            }"
            name="Birthyear"
          >
            <b-form-group
              id="input-group-4"
              :label="$t('Geboortejaar:')"
              label-for="input-4"
            >
              <b-form-select
                v-model="year"
                :options="year_list"
                :state="errors[0] ? false : valid ? true : null"
              />
              <b-form-invalid-feedback
                id="input-4-live-feedback"
                :style="{ display: 'inline' }"
              >
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, errors }"
            :rules="{
              required: true,
              between_dates: { year: year, min: minAgeDate, max: maxAgeDate },
            }"
            name="Birthmonth"
          >
            <b-form-group
              id="input-group-24"
              :label="$t('Geboortemaand:')"
              label-for="input-24"
            >
              <b-form-select
                v-model="month"
                :options="month_list"
                :state="errors[0] ? false : valid ? true : null"
              />
              <b-form-invalid-feedback
                id="input-24-live-feedback"
                :style="{ display: 'inline' }"
              >
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, errors }"
            rules="required"
            name="Sex"
          >
            <b-form-group
              id="input-group-7"
              :label="$t('Geslacht:')"
              label-for="input-7"
            >
              <b-form-select
                id="input-7"
                v-model="sex"
                :options="geslacht"
                :state="errors[0] ? false : valid ? true : null"
                aria-describedby="input-7-live-feedback"
              />
              <b-form-invalid-feedback id="input-7-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-form-group>
            <b-button
              id="popover"
              :href="require('~/assets/b_c_maattabel_in_cm_720.png')"
              class="button-hero"
              variant="info"
            >
              <font-awesome-icon :icon="['fas', 'tshirt']" /> {{ $t("Info") }}
            </b-button>
            <b-popover
              target="popover"
              triggers="hover focus"
              placement="buttom"
            >
              <b-img
                src="~/assets/b_c_maattabel_in_cm_720.png"
                height="auto"
                width="600"
                alt="Responsive image"
              />
            </b-popover>
          </b-form-group>
          <ValidationProvider
            v-slot="{ valid, errors }"
            :rules="{ required: true, oneOf: shirt_list }"
            name="T-shirtSize"
          >
            <b-form-group
              id="input-group-9"
              :label="$t('T-shirt maat:')"
              label-for="input-9"
            >
              <b-form-select
                id="input-9"
                v-model="t_size"
                :state="errors[0] ? false : valid ? true : null"
                aria-describedby="input-9-live-feedback"
              >
                <option :value="null">
                  {{ $t("T-shirt maat:") }}
                </option>
                <optgroup :label="$t('Female')" :options="shirtsize_female">
                  <option
                    v-for="shirt in shirtsize_female"
                    :key="shirt.value"
                    :value="shirt.value"
                  >
                    {{ shirt.text }}
                  </option>
                </optgroup>
                <optgroup :label="$t('Male')">
                  <option
                    v-for="shirt in shirtsize_male"
                    :key="shirt.value"
                    :value="shirt.value"
                  >
                    {{ shirt.text }}
                  </option>
                </optgroup>
              </b-form-select>
              <b-form-invalid-feedback id="input-9-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, errors }"
            rules="required|digits:4"
            name="PostalCode"
          >
            <b-form-group
              id="input-group-1"
              :label="$t('Postcode:')"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="postalcode"
                :placeholder="$t('Postcode:')"
                :state="errors[0] ? false : valid ? true : null"
                type="number"
                aria-describedby="input-1-live-feedback"
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, errors }"
            rules="required"
            name="Street"
          >
            <b-form-group
              id="input-group-1z"
              :label="$t('Street')"
              label-for="input-1z"
            >
              <b-form-input
                id="input-1z"
                v-model="street"
                :placeholder="$t('Street')"
                :state="errors[0] ? false : valid ? true : null"
                aria-describedby="input-1z-live-feedback"
              />
              <b-form-invalid-feedback id="input-1z-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, errors }"
            rules="required"
            name="HouseNumber"
          >
            <b-form-group
              id="input-group-2z"
              :label="$t('HouseNumber')"
              label-for="input-2z"
            >
              <b-form-input
                id="input-2z"
                v-model="house_number"
                :placeholder="$t('HouseNumber')"
                :state="errors[0] ? false : valid ? true : null"
                aria-describedby="input-2z-live-feedback"
              />
              <b-form-invalid-feedback id="input-2z-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" name="BusNumber">
            <b-form-group
              id="input-group-3z"
              :label="$t('BusNumber')"
              label-for="input-3z"
            >
              <b-form-input
                id="input-3z"
                v-model="bus_number"
                :placeholder="$t('BusNumber')"
                :state="errors[0] ? false : valid ? true : null"
                aria-describedby="input-3z-live-feedback"
              />
              <b-form-invalid-feedback id="input-3z-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ valid, errors }"
            :rules="{
              required: true,
              regex: /^((\+|00)32\s?|0)([1-9][0-9]\d{6})\d?$/,
            }"
            name="MobileNumber"
          >
            <b-form-group
              id="input-group-2"
              :label="$t('mobiel nummer (+32):')"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="gsm"
                :placeholder="$t('mobiel nummer (+32):')"
                :description="
                  $t('Waar kunnen we jou bereiken in geval van nood')
                "
                :state="errors[0] ? false : valid ? true : null"
                type="tel"
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
                :state="errors[0] ? false : valid ? true : null"
                aria-describedby="input-10-live-feedback"
              />
              <b-form-invalid-feedback id="input-10-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <div v-if="!isGuardianNeeded">
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="max:255"
              name="Medical"
            >
              <b-form-group
                id="input-group-11"
                :label="$t('Zijn er aandoeningen')"
                label-for="input-11"
              >
                <b-form-textarea
                  id="input-11"
                  v-model="medical"
                  :state="errors[0] ? false : valid ? true : null"
                  aria-describedby="input-11-live-feedback"
                />
                <b-form-invalid-feedback id="input-11-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <h2>{{ $t("Algemene vragen") }}</h2>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="GeneralQuestions"
            >
              <b-form-group id="input-group-12" :label="$t('no_photo')">
                <b-form-radio-group
                  v-model="general_questions"
                  :state="errors[0] ? false : valid ? true : null"
                  :options="photo_options"
                  stacked
                >
                  <b-form-invalid-feedback id="input-12-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-radio-group>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="GeneralQuestions2"
            >
              <b-form-group id="input-group-122" :label="$t('no_contact')">
                <b-form-radio-group
                  v-model="general_questions2"
                  :state="errors[0] ? false : valid ? true : null"
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
            <h2>{{ $t("Informatie van je ouders/voogd") }}</h2>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required|email"
              name="Email"
            >
              <b-form-group
                id="input-group-13"
                :label="$t('Email adres ouders/voogd:')"
                label-for="input-13"
                de:description="$t('We delen dit met niemand')"
              >
                <b-form-input
                  id="input-13"
                  v-model="email_guardian"
                  :placeholder="$t('Email adres ouders/voogd:')"
                  :state="errors[0] ? false : valid ? true : null"
                  type="email"
                  aria-describedby="input-13-live-feedback"
                />
                <b-form-invalid-feedback id="input-13-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ valid, errors }"
              :rules="{
                required: true,
                regex: /^((\+|00)32\s?|0)([1-9][0-9]\d{6})\d?$/,
              }"
              name="Phone"
            >
              <b-form-group
                id="input-group-14"
                :label="$t('mobiel nummer ouders/voogd')"
                :description="
                  $t('Waar kunnen we jou bereiken in geval van nood')
                "
                label-for="input-14"
              >
                <b-form-input
                  id="input-14"
                  v-model="gsm_guardian"
                  :placeholder="$t('mobiel nummer ouders/voogd')"
                  :state="errors[0] ? false : valid ? true : null"
                  type="tel"
                  aria-describedby="input-14-live-feedback"
                />
              </b-form-group>
              <b-form-invalid-feedback id="input-14-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="max:255"
              name="Medical"
            >
              <b-form-group
                id="input-group-15"
                :label="$t('Zijn er aandoeningen')"
                label-for="input-15"
              >
                <b-form-textarea
                  id="input-15"
                  v-model="medical"
                  :state="errors[0] ? false : valid ? true : null"
                  aria-describedby="input-15-live-feedback"
                />
                <b-form-invalid-feedback id="input-15-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <h2>{{ $t("Algemene vragen") }}</h2>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="GeneralQuestions"
            >
              <b-form-group id="input-group-12" :label="$t('no_photo')">
                <b-form-radio-group
                  v-model="general_questions"
                  :state="errors[0] ? false : valid ? true : null"
                  :options="photo_options"
                  stacked
                >
                  <b-form-invalid-feedback id="input-12-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-radio-group>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="GeneralQuestions2"
            >
              <b-form-group id="input-group-122" :label="$t('no_contact')">
                <b-form-radio-group
                  v-model="general_questions2"
                  :state="errors[0] ? false : valid ? true : null"
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
            <b-button type="submit" variant="info" class="button-hero">
              <font-awesome-icon :icon="['fas', 'user-edit']" />
              {{ $t("Aanpassen") }}
            </b-button>
            <b-button type="reset" variant="warning" class="button-hero">
              <font-awesome-icon :icon="['fas', 'trash-restore']" />
              {{ $t("Resetten") }}
            </b-button>
            <b-button
              v-if="delete_possible"
              type="button"
              variant="danger"
              class="button-hero"
              @click="onDeleteInfo"
            >
              <font-awesome-icon :icon="['fas', 'user-minus']" />
              {{ $t("Delete") }}
            </b-button>
            <b-modal v-model="deleteInfo" ok-title="Delete" @ok="onDelete">
              Opgelet: als je bevestigt wordt jouw gebruiker verwijderd dat will
              zeggen dat al jouw Personlijke en Project informatie worden
              verwijderd ...Als je toch nog wilt meedoen dan kan je via
              Registratie een nieuw project aanmaken of bij een andere project
              meedoen.
            </b-modal>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { addYears, differenceInYears } from 'date-fns'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'authenticated',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  async asyncData ({ store, query, app, redirect, route }) {
    // load userdata & store in userstore
    const userData = await app.$services.userinfo.get()
    await store.dispatch('user/updateUser', userData)
    let date = store.state.user.birthmonth
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
        {
          value: 'contact',
          text: 'Je mag me contacteren voor de volgende events'
        }
      ],
      shirtsize_male: [
        // Jongen/Garçon/Boy/KID
        { value: 'kid_3/4', text: this.$i18n.t('kid') + ' 3/4' },
        { value: 'kid_5/6', text: this.$i18n.t('kid') + ' 5/6' },
        { value: 'kid_7/8', text: this.$i18n.t('kid') + ' 7/8' },
        { value: 'kid_9/11', text: this.$i18n.t('kid') + ' 9/11' },
        { value: 'kid_12/14', text: this.$i18n.t('kid') + ' 12/14' },
        { value: 'male_Xsmall', text: this.$i18n.t('men') + ' XS' },
        { value: 'male_small', text: this.$i18n.t('men') + ' S' },
        { value: 'male_medium', text: this.$i18n.t('men') + ' M' },
        { value: 'male_large', text: this.$i18n.t('men') + ' L' },
        { value: 'male_xl', text: this.$i18n.t('men') + ' XL' },
        { value: 'male_xxl', text: this.$i18n.t('men') + ' 2XL' },
        { value: 'male_3xl', text: this.$i18n.t('men') + ' 3XL' },
        { value: 'male_4xl', text: this.$i18n.t('men') + ' 4XL' },
        { value: 'male_5xl', text: this.$i18n.t('men') + ' 5XL' }
      ],
      shirtsize_female: [
        // Meisje/Fille/Girl
        { value: 'female_xs', text: this.$i18n.t('women') + ' XS' },
        { value: 'female_medium', text: this.$i18n.t('women') + ' M' },
        { value: 'female_large', text: this.$i18n.t('women') + ' L' },
        { value: 'female_xl', text: this.$i18n.t('women') + ' XL' },
        { value: 'female_2xl', text: this.$i18n.t('women') + ' 2XL' },
        { value: 'female_3xl', text: this.$i18n.t('women') + ' 3XL' }
      ],
      deleteInfo: false
    }
  },
  computed: {
    shirt_list () {
      const valuemap = (x) => {
        return x.value
      }
      return this.shirtsize_male
        .map(valuemap)
        .concat(this.shirtsize_female.map(valuemap))
    },
    tshirtDisabled () {
      return this.tshirtDate < new Date()
    },
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
      const yearList = [{ text: app.$i18n.t('year'), value: null }]
      for (let i = 0; i <= yearEnd - yearStart; i++) {
        yearList.push({ text: yearStart + i, value: yearStart + i })
      }
      return yearList
    },
    endDate: (state) => {
      return addYears(state.startDateEvent, -5)
    },
    isGuardianNeeded: (state) => {
      return (
        differenceInYears(
          state.startDateEvent,
          new Date(state.year, state.month, 1)
        ) < state.guardianAge
      )
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
    ...mapGetters(['minAgeDate', 'maxAgeDate']),
    ...mapState([
      'startDateEvent',
      'maxAge',
      'minAge',
      'guardianAge',
      'tshirtDate'
    ]),
    ...mapState('user', [
      'birthmonth',
      'language',
      'email',
      'postalcode',
      'gsm',
      'delete_possible'
    ]),
    postalcode: {
      set (value) {
        this.$store.commit('user/postalcode', value)
      },
      get () {
        return this.$store.state.user.postalcode
      }
    },
    street: {
      set (value) {
        this.$store.commit('user/street', value)
      },
      get () {
        return this.$store.state.user.street
      }
    },
    house_number: {
      set (value) {
        this.$store.commit('user/house_number', value)
      },
      get () {
        return this.$store.state.user.house_number
      }
    },
    bus_number: {
      set (value) {
        this.$store.commit('user/bus_number', value)
      },
      get () {
        return this.$store.state.user.bus_number
      }
    },
    email: {
      set (value) {
        this.$store.commit('user/email', value)
      },
      get () {
        return this.$store.state.user.email
      }
    },
    sex: {
      set (value) {
        this.$store.commit('user/sex', value)
      },
      get () {
        return this.$store.state.user.sex
      }
    },
    general_questions: {
      set (value) {
        this.$store.commit('user/general_questions', value)
      },
      get () {
        return this.$store.state.user.general_questions
      }
    },
    general_questions2: {
      set (value) {
        this.$store.commit('user/general_questions2', value)
      },
      get () {
        return this.$store.state.user.general_questions2
      }
    },
    mandatory_approvals: {
      set (value) {
        this.$store.commit('user/mandatory_approvals', value)
      },
      get () {
        return this.$store.state.user.mandatory_approvals
      }
    },
    t_size: {
      set (value) {
        this.$store.commit('user/t_size', value)
      },
      get () {
        return this.$store.state.user.t_size
      }
    },
    via: {
      set (value) {
        this.$store.commit('user/via', value)
      },
      get () {
        return this.$store.state.user.via
      }
    },
    medical: {
      set (value) {
        this.$store.commit('user/medical', value)
      },
      get () {
        return this.$store.state.user.medical
      }
    },
    gsm: {
      set (value) {
        this.$store.commit('user/gsm', value)
      },
      get () {
        return this.$store.state.user.gsm
      }
    },
    gsm_guardian: {
      set (value) {
        this.$store.commit('user/gsm_guardian', value)
      },
      get () {
        return this.$store.state.user.gsm_guardian
      }
    },
    email_guardian: {
      set (value) {
        this.$store.commit('user/email_guardian', value)
      },
      get () {
        return this.$store.state.user.email_guardian
      }
    }
  },
  watch: {
    year (val) {
      let date = this.$store.state.user.birthmonth
      if (date === null) {
        date = new Date()
      }
      if (typeof date === 'string') {
        date = new Date(date)
      }
      date.setDate(1)
      date.setFullYear(val)
      this.$store.commit('user/birthmonth', date)
    },
    month (val) {
      let date = this.$store.state.user.birthmonth
      if (date === null) {
        date = new Date()
      }
      if (typeof date === 'string') {
        date = new Date(date)
      }
      date.setDate(1)
      date.setMonth(val)
      this.$store.commit('user/birthmonth', date)
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
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async onSubmit (evt) {
      try {
        const userData = await this.$services.userinfo.patch()
        await this.$store.dispatch('user/updateUser', userData)
        this.variant = 'success'
        this.message = this.$i18n.t('successUpdate')
        this.show = true
      } catch (error) {
        this.variant = 'danger'
        this.message = this.$i18n.t('failedUpdate')
        this.show = true
      }
      window.scrollTo(0, 0)
    },
    async onReset (evt) {
      const userData = await this.$services.userinfo.get()
      await this.$store.dispatch('user/updateUser', userData)
    },
    onDeleteInfo (evt) {
      this.deleteInfo = true
    },
    async onDelete (evt) {
      await this.$services.userinfo.delete()
      this.logout()
      this.$router.push({ path: 'login' })
    }
  }
}
</script>

<style>
</style>
