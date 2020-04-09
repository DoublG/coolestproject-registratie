<template>
  <b-row>
    <b-col>
      <h1>{{ $t('titleReg') }}</h1>
      <b-alert :show="show" :variant="variant" dismissible>
        {{ message }}
      </b-alert>
      <h2>{{ $t('personal_info') }}</h2>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required|email" name="Email">
            <b-form-group
              id="input-group-3"
              :label="$t('Email adres:')"
              :description="$t('We delen dit met niemand')"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="email"
                :placeholder="$t('Email adres:')"
                :state="errors[0] ? false : (valid ? true : null)"
                type="email"
                aria-describedby="input-3-live-feedback"
              />
              <b-form-invalid-feedback id="input-3-live-feedback">
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
          <b-form-group>
            <b-button
              id="popover"
              :href="require('~/assets/b_c_maattabel_in_cm_720.png')"
              class="button-hero"
              variant="info"
            >
              <font-awesome-icon :icon="['fas', 'tshirt']" /> {{ $t('Info') }}
            </b-button>
            <b-popover target="popover" triggers="hover focus" placement="buttom">
              <b-img
                src="~/assets/b_c_maattabel_in_cm_720.png"
                height="auto"
                width="600"
                alt="Responsive image"
              />
            </b-popover>
          </b-form-group>
          <ValidationProvider v-slot="{ valid, errors }" :rules="{ required: true, oneOf: shirt_list }" name="T-shirtSize">
            <b-form-group
              id="input-group-9"
              :label="$t('T-shirt maat:')"
              label-for="input-9"
            >
              <b-form-select
                id="input-9"
                v-model="t_size"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-9-live-feedback"
              >
                <option :value="null">
                  {{ $t('T-shirt maat:') }}
                </option>
                <optgroup :label="$t('Female')" :options="shirtsize_female">
                  <option v-for="shirt in shirtsize_female" :key="shirt.value" :value="shirt.value">
                    {{ shirt.text }}
                  </option>
                </optgroup>
                <optgroup :label="$t('Male')">
                  <option v-for="shirt in shirtsize_male" :key="shirt.value" :value="shirt.value">
                    {{ shirt.text }}
                  </option>
                </optgroup>
              </b-form-select>
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
                :state="errors[0] ? false : (valid ? true : null)"
                type="number"
                aria-describedby="input-1-live-feedback"
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
<ValidationProvider v-slot="{ valid, errors }" rules="required" name="Street">
            <b-form-group
              id="input-group-1z"
              :label="$t('Street:')"
              label-for="input-1z"
            >
              <b-form-input
                id="input-1z"
                v-model="street"
                :placeholder="$t('Street:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-1z-live-feedback"
              />
              <b-form-invalid-feedback id="input-1z-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="HouseNumber">
            <b-form-group
              id="input-group-2z"
              :label="$t('HouseNumber:')"
              label-for="input-2z"
            >
              <b-form-input
                id="input-2z"
                v-model="house_number"
                :placeholder="$t('HouseNumber:')"
                :state="errors[0] ? false : (valid ? true : null)"
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
              :label="$t('BusNumber:')"
              label-for="input-3z"
            >
              <b-form-input
                id="input-3z"
                v-model="bus_number"
                :placeholder="$t('BusNumber:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-3z-live-feedback"
              />
              <b-form-invalid-feedback id="input-3z-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" :rules="{ required: true, regex: /^((\+|00)32\s?|0)([1-9][0-9]\d{6})\d?$/ }" name="MobileNumber">
            <b-form-group
              id="input-group-2"
              :label="$t('mobiel nummer (+32):')"
              :description="$t('Waar kunnen we jou bereiken in geval van nood')"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="gsm"
                :placeholder="$t('mobiel nummer (+32):')"
                :state="errors[0] ? false : (valid ? true : null)"
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
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-10-live-feedback"
              />
              <b-form-invalid-feedback id="input-10-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <div v-if="!isGuardianNeeded">
            <ValidationProvider v-slot="{ valid, errors }" rules="max:255" name="Medical">
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
                  :placeholder="$t('Email adres ouders/voogd:')"
                  :state="errors[0] ? false : (valid ? true : null)"
                  type="email"
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
                :description="$t('Waar kunnen we jou bereiken in geval van nood')"
                label-for="input-14"
              >
                <b-form-input
                  id="input-14"
                  v-model="gsm_guardian"
                  :placeholder="$t('mobiel nummer ouders/voogd')"
                  :state="errors[0] ? false : (valid ? true : null)"
                  type="tel"
                  aria-describedby="input-14-live-feedback"
                />
              </b-form-group>
              <b-form-invalid-feedback id="input-14-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="max:255" name="Medical">
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
                :description="$t('taalJury')"
                label-for="select-18"
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
            <ValidationProvider v-slot="{ valid, errors }" rules="max:100" name="ProjectType">
              <b-form-group
                id="input-group-166"
                :label="$t('Project_Type')"
                label-for="input-166"
              >
                <b-form-textarea
                  id="input-166"
                  v-model="project_type"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-166-live-feedback"
                />
                <b-form-invalid-feedback id="input-166-live-feedback">
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
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:4000" name="ProjectDescription">
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
                :description="$t('Geefcode')"
                label-for="input-22"
              >
                <b-form-input
                  id="input-22"
                  v-model="project_code"
                  :state="errors[0] ? false : (valid ? true : null)"
                  placeholder="Code"
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
              :disabled="loading"
              type="submit"
              variant="info"
              class="button-hero"
            >
              <span v-if="loading"><b-spinner type="grow" /> {{ $t('pleaseWait') }}</span>
              <span v-else><font-awesome-icon v-if="!loading" :icon="['fas', 'paper-plane']" /> {{ $t('Ik schrijf me in') }}</span>
            </b-button>
            <b-button
              :disabled="loading"
              type="reset"
              variant="warning"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'trash-restore']" />  {{ $t('verwijder alles') }}
            </b-button>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import addYears from 'date-fns/add_years'
import differenceInYears from 'date-fns/difference_in_years'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'notAuthenticated',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      loading: false,
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
      mandatory_approvals_list: [
        { value: 'ok', text: this.$i18n.t('Ikbenakkoord') }
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
      ]
    }
  },

  computed: {
    shirt_list () {
      const valuemap = (x) => { return x.value }
      return this.shirtsize_male.map(valuemap).concat(this.shirtsize_female.map(valuemap))
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
      return differenceInYears(state.startDateEvent, new Date(state.year, state.month, 1)) < state.guardianAge
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
    ...mapGetters([
      'minAgeDate',
      'maxAgeDate'
    ]),
    ...mapState([
      'startDateEvent',
      'maxAge',
      'minAge',
      'guardianAge'
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
    street: {
      set (value) {
        this.$store.commit('registration/street', value)
      },
      get () {
        return this.$store.state.user.street
      }
    },
    house_number: {
      set (value) {
        this.$store.commit('registration/house_number', value)
      },
      get () {
        return this.$store.state.user.house_number
      }
    },
    bus_number: {
      set (value) {
        this.$store.commit('registration/bus_number', value)
      },
      get () {
        return this.$store.state.user.bus_number
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
  },
  asyncData ({ store, redirect }) {
    if (new Date(store.state.auth.expires) > new Date()) {
      redirect('/user')
    }
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
<i18n>
{
  "en": {
    "Achternaam:": "Last Name",
    "Algemene vragen": "General Questions",
    "april": "April",
    "augustus": "August",
    "december": "December",
    "E-mail adres ouders/voogd:": "E-mail address parents / guardian",
    "E-mail adres:": "E-mail address",
    "eigenProject": "I have my own project",
    "failedReg": "Registration failed try again later",
    "februari": "February",
    "Geboortejaar:": "Year of birth",
    "Geboortemaand:": "Birth month",
    "Geef je dojo, school": "Give your dojo, school ..",
    "GeefAchternaam:": "Enter your last name",
    "Geefcode": "Enter the code that you received from the project owner",
    "GeefProjectnaam:": "Enter project name",
    "GeefVoornaam:": "Enter your first name",
    "Geslacht:": "I am a ..",
    "Ik ben een": "I am a..",
    "Ik schrijf me in": "I register",
    "Ikbenakkoord": "I agree with the general conditions",
    "Info": "Info",
    "Informatie van je ouders/voogd": "Your parents / guardian info",
    "Is er nog extra informatie": "Is there any additional information we must take into account",
    "januari": "January",
    "Je moet akkoord": "You must agree to the following question in order to register",
    "jongen": "Boy",
    "juli": "July",
    "juni": "June",
    "Kiesmaand": "Select a month",
    "kiesmaat": "Choose a size",
    "maart": "March",
    "medeProject": "I participate in an existing project",
    "mei": "May",
    "meisje": "Girl",
    "mobiel nummer (+32):": "mobile number or landline (+32)",
    "mobiel nummer ouders/voogd": "mobile number parents / guardian (+32)",
    "no_contact": "You can contact me for future events",
    "no_photo": "CoderDojo is fun so we like sharing that with the world. During our activities we take pictures that may appear on social media afterwards so it could be the case that you get photographed or filmed during one of these CoderDojo activities. We don't use this footage on flyers or campaign without explicitly asking for permission. If you rather don't want your picture to be used you can mention this at your registration.",
    "NOc": "No",
    "NOp": "No",
    "november": "November",
    "oktober": "October",
    "Omschrijving:": "Description",
    "personal_info": "Personal information",
    "Postcode:": "Postal Code",
    "Project": "Project",
    "Street": "Street",
    "HouseNumber": "House Number",
    "BusNumber": "Box Number",
    "Project_Type": "What is in your project about hardware software network on WiFi or on cable....",
    "Projectcode:": "Project token",
    "Projectnaam:": "Project name",
    "Projecttype:": "Project type",
    "Selecteer wat je project allemaal doet, nodig heeft": "Select what your project needs",
    "september": "September",
    "successReg": "The registration for the creation of your project is successful when you get a confirmation mail with further instructions to login and to see and/or change your data. Be aware: 1 registration per person.",
    "T-shirt maat:": "T-shirt size",
    "Taal:": "Language",
    "taalJury": "In which language do you want to explain the project to the jury?",
    "titleReg": "User",
    "Van waar ken je ons:": "Where do you know us from",
    "verwijder alles": "Reset",
    "Voornaam:": "First Name",
    "Waar kunnen we jou bereiken in geval van nood": "Which number do we use in case of emergency?",
    "We delen dit met niemand": "We don’t share this with anyone",
    "YESc": "Yes",
    "YESp": "Yes",
    "Zijn er aandoeningen": "Are there any conditions or allergies that we should take into account",
    "Female": "Women",
    "Male": "Kid/Men",
    "pleaseWait" : "Please Wait",
    "kid": "kid",
    "men": "men",
    "women": "women"
  },
  "fr": {
    "Street": "Rue",
    "HouseNumber": "Numéro de maison",
    "BusNumber": "Numéro de boîte",
    "Achternaam:": "Nom de Famille",
    "Algemene vragen": "Questions d'ordre général",
    "april": "avril",
    "augustus": "août",
    "december": "décembre",
    "eigenProject": "J'ai mon propre projet",
    "Email adres ouders/voogd:": "Adresse mail des parents / tuteur",
    "Email adres:": "Adresse mail",
    "failedReg": "L'inscription a échoué - Essaie à nouveau",
    "februari": "février",
    "Geboortejaar:": "Année de naissance",
    "Geboortemaand:": "Mois de naissance",
    "Geef je dojo, school": "Précise le nom de ton Dojo ..",
    "GeefAchternaam:": "Mentionne ton nom de famille",
    "Geefcode": "Entre le code reçu via le propriétaire du projet",
    "GeefProjectnaam:": "Entrez le nom du projet",
    "GeefVoornaam:": "Mentionne ton prénom",
    "Geslacht:": "Je suis un(e)..",
    "Ik ben een": "Je suis un(e)..",
    "Ik schrijf me in": "Je m'inscris",
    "Ikbenakkoord": "Tu dois accepter la question suivante pour t'inscrire",
    "Info": "Info",
    "Informatie van je ouders/voogd": "Informations concernant vos parents / tuteur",
    "Is er nog extra informatie": "Y-a t'il des informations supplémentaires dont nous devrions tenir compte ?",
    "januari": "janvier",
    "Je moet akkoord": "Tu dois accepter la question suivante pour t'inscrire",
    "jongen": "Garçon",
    "juli": "juillet",
    "juni": "juin",
    "Kiesjaar": "Sélectionne une année",
    "Kiesmaand": "Sélectionne un mois",
    "kiesmaat": "Choisis une taille",
    "maart": "mars",
    "medeProject": "Je participe à un projet existant",
    "mei": "mai",
    "meisje": "Fille",
    "mobiel nummer (+32):": "numéro de gsm ou fixe",
    "mobiel nummer ouders/voogd": "parents / tuteurs du  (+32)",
    "no_contact": "Nous respectons vos données personnelles ! Pour plus d’infos consultez notre clause de confidentialité sur notre site web. Pouvons-nous vous informer des prochains événements Coolest Projects par e-mail?",
    "no_photo": "CoderDojo c'est tellement fun que nous aimons promotionner notre action à travers les réseaux sociaux et pour ce faire nous prenons des photos pendant nos événements. Chaque participant(e) pourrait être photographié ou filmé lors de sa participation à notre événement. Ces photos sont ensuite postées et partagées sur nos réseaux sociaux. Celles-ci ne sont pas imprimées et ne figurent pas sur nos brochures. Si toutes fois quelques photos devaient servir à des fins de campagnes promotionnelles plus étendues nous vous demanderons bien sûr votre accord avant diffusion. Si vous ne tenez pas à ce que ces photos soient utilisées nous vous remercions de nous en faire part lors de votre enregistrement.",
    "NOc": "Non",
    "NOp": "Non",
    "november": "novembre",
    "oktober": "octobre",
    "Omschrijving:": "Description",
    "personal_info": "Informations personnelles",
    "Postcode:": "Code postal",
    "Project": "Projet",
    "Project_Type": "Qu'en est-il de votre projet au niveau matériel hardware, logiciel, réseau via WiFi ou par câble....",
    "Projectcode:": "Jeton du projet",
    "Projectnaam:": "Nom du projet",
    "Projecttype:": "Type de projet",
    "Selecteer wat je project allemaal doet, nodig heeft": "Sélectionnez les besoins de votre projet réalisé",
    "september": "septembre",
    "successReg": "L'inscription pour la création de votre projet est réussie, vous allez recevoir un e-mail de confirmation avec des instructions supplémentaires pour vous connecter et afficher et / ou mettre à jour vos données. Remarque : Une seule inscription par propriétaire de projet.",
    "T-shirt maat:": "Taille de T-shirt",
    "Taal:": "Langue",
    "taalJury": "Dans quelle langue souhaitez-vous présenter le projet au jury?",
    "titleReg": "Utilisateur",
    "Van waar ken je ons:": "Où avez-vous entendu parlé de CoderDojo pour la première fois?",
    "verwijder alles": "Restaurer",
    "Voornaam:": "Prénom",
    "Waar kunnen we jou bereiken in geval van nood": "En cas d'urgence, quel numéro devons-nous appeler?",
    "We delen dit met niemand": "Nous ne divulguerons ceci à personne",
    "YESc": "Oui",
    "YESp": "Oui",
    "Zijn er aandoeningen": "Y a-t-il des conditions ou des allergies dont nous devons tenir compte",
    "Female": "Femmes",
    "Male": "Enfants/Hommes",
    "pleaseWait" : "Veuillez Patienter",
    "kid": "enfant",
    "men": "hommes",
    "women": "femmes"
  },
  "nl": {
    "Street": "Straat",
    "HouseNumber": "Huisnummer",
    "BusNumber": "Busnummer",
    "Achternaam:": "Achternaam",
    "Algemene vragen": "Algemene vragen",
    "april": "april",
    "augustus": "augustus",
    "december": "december",
    "eigenProject": "Ik heb mijn eigen project",
    "Email adres ouders/voogd:": "E-mail adres ouders/voogd",
    "Email adres:": "E-mail",
    "failedReg": "Registratie mislukt probeer later nog eens opnieuw",
    "februari": "februari",
    "Geboortejaar:": "Geboortejaar",
    "Geboortemaand:": "Geboortemaand",
    "Geef je dojo, school": "Geef je dojo, school ..",
    "GeefAchternaam:": "Geef je achternaam in",
    "Geefcode": "Geef de code in die je van de projecteigenaar gekregen hebt",
    "GeefProjectnaam:": "Geef project naam",
    "GeefVoornaam:": "Geef je voornaam in",
    "Geslacht:": "Ik ben een..",
    "Ik ben een": "Ik ben een..",
    "Ik schrijf me in": "Ik schrijf me in",
    "Ikbenakkoord": "Ik ben akkoord met de algemene voorwaarden",
    "Info": "Info",
    "Informatie van je ouders/voogd": "Informatie van je ouders/voogd",
    "Is er nog extra informatie": "Is er nog extra informatie waar we rekening mee moeten houden",
    "januari": "januari",
    "Je moet akkoord": "Je moet akkoord gaan met volgende vraag om je te kunnen inschrijven",
    "jongen": "Jongen",
    "juli": "juli",
    "juni": "juni",
    "Kiesjaar": "Kies een jaar",
    "Kiesmaand": "Kies een maand",
    "kiesmaat": "Kies een maat",
    "maart": "maart",
    "medeProject": "Ik werk mee aan een bestaand project",
    "mei": "mei",
    "meisje": "Meisje",
    "mobiel nummer (+32):": "mobiel nummer of vaste lijn (+32)",
    "mobiel nummer ouders/voogd": "mobiel nummer of vaste lijn ouders/voogd (+32)",
    "no_contact": "We respecteren je data. Bekijk daarom zeker even ons privacy statement op de website. Mogen we jou via mail op de hoogte brengen over volgende Coolest Projects evenementen?",
    "no_photo": "CoderDojo is leuk en daarom tonen wij graag waar we mee bezig zijn. We nemen tijdens onze activiteiten foto’s van onze deelnemers en begeleiders die we daarna op sociale media plaatsen. Het kan gebeuren dat je gefotografeerd of gefilmd wordt tijdens ons event. Wij gebruiken dit beeldmateriaal niet op flyers of voor uitvoerige campagnes zonder hiervoor nog eens expliciet toestemming te vragen. Indien je liever geen foto’s van je gebruikt ziet worden kan je dat tijdens het registreren aangeven.",
    "NOc": "Bewaar mijn data niet en contacteer mij niet",
    "NOp": "Gelieve geen foto’s en filmpjes te gebruiken waarop de deelnemer herkenbaar is",
    "november": "november",
    "oktober": "oktober",
    "Omschrijving:": "Omschrijving",
    "personal_info": "Persoonlijke informatie",
    "Postcode:": "Postcode",
    "Project": "Project",
    "Project_Type": "Wat zit er in jouw project aan hardware software netwerk via wifi of via kabel....",
    "Projectcode:": "Project token",
    "Projectnaam:": "Projectnaam",
    "Projecttype:": "Projecttype",
    "Selecteer wat je project allemaal doet, nodig heeft": "Selecteer wat je project allemaal nodig heeft",
    "september": "september",
    "successReg": "De registratie voor het aanmaken van je project is gelukt als je een bevestigingsmail ontvangt met verdere instructies om in te loggen en je gegevens te bekijken en/of bij te werken. Let op: 1 registratie per projectowner.",
    "T-shirt maat:": "T-shirt maat",
    "Taal:": "Taal",
    "taalJury": "In welke taal wil je het project uitleggen aan de jury?",
    "titleReg": "Gebruiker",
    "Van waar ken je ons:": "Van waar ken je ons",
    "verwijder alles": "Resetten",
    "Voornaam:": "Voornaam",
    "Waar kunnen we jou bereiken in geval van nood": "Welk nummer gebruiken we in geval van nood?",
    "We delen dit met niemand": "We delen dit met niemand",
    "YESc": "Je mag mij contacteren wanneer ik kan inschrijven voor een volgende evenement",
    "YESp": "Dat is geen probleem",
    "Zijn er aandoeningen": "Zijn er aandoeningen of allergieën waar we rekening mee moeten houden",
    "Female": "Dames",
    "Male": "Kind/Mannen",
    "pleaseWait" : "Even geduld",
    "kid": "kind",
    "men": "mannen",
    "women": "dames"
  }
}
</i18n>
