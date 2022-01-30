<template>
  <div>
    <ValidationProvider
      v-if="!fieldStatus.language.hidden"
      v-slot="{ valid, errors }"
      rules="required"
      name="Language"
    >
      <b-form-group
        id="input-group-18"
        :label="$t('label_taal_user')"
        :description="$t('description_taal')"
        label-for="select-18"
      >
        <b-form-select
          id="select-18"
          :value="user.language"
          :options="languages"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-18-live-feedback"
          :disabled="!fieldStatus.language.rw"
          @input="updateValue('language', $event)"
        />
        <b-form-invalid-feedback id="input-18-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      v-if="!fieldStatus.email.hidden"
      v-slot="{ valid, errors }"
      rules="required|email"
      name="Email"
    >
      <b-form-group
        id="input-group-3"
        :label="$t('label_Email adres:')"
        :description="$t('description_We delen dit met niemand')"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          :disabled="!fieldStatus.email.rw"
          :value="user.email"
          :placeholder="$t('placeholder_Email adres:')"
          :state="errors[0] ? false : valid ? true : null"
          type="email"
          aria-describedby="input-3-live-feedback"
          @input="updateValue('email', $event)"
        />
        <b-form-invalid-feedback id="input-3-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      v-if="!fieldStatus.firstname.hidden"
      v-slot="{ valid, errors }"
      rules="required"
      name="FirstName"
    >
      <b-form-group
        id="input-group-5"
        :label="$t('label_Voornaam:')"
        label-for="input-5"
      >
        <b-form-input
          id="input-5"
          :value="user.firstname"
          :disabled="!fieldStatus.firstname.rw"
          :placeholder="$t('placeholder_GeefVoornaam:')"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-5-live-feedback"
          @input="updateValue('firstname', $event)"
        />
        <b-form-invalid-feedback id="input-5-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      v-if="!fieldStatus.lastname.hidden"
      v-slot="{ valid, errors }"
      rules="required"
      name="LastName"
    >
      <b-form-group
        id="input-group-6"
        :label="$t('label_Achternaam:')"
        label-for="input-6"
      >
        <b-form-input
          id="input-6"
          :value="user.lastname"
          :disabled="!fieldStatus.lastname.rw"
          :placeholder="$t('placeholder_GeefAchternaam:')"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-6-live-feedback"
          @input="updateValue('lastname', $event)"
        />
        <b-form-invalid-feedback id="input-6-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      v-if="!fieldStatus.year.hidden"
      v-slot="{ valid, errors }"
      :rules="{
        required: true
      }"
      name="Birthyear"
    >
      <b-form-group
        id="input-group-4"
        :label="$t('label_Geboortejaar:')"
        label-for="input-4"
      >
        <b-form-select
          :value="user.year"
          :disabled="!fieldStatus.year.rw"
          :options="yearList"
          :state="errors[0] ? false : valid ? true : null"
          @input="updateValue('year', $event)"
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
      v-if="!fieldStatus.month.hidden"
      v-slot="{ valid, errors }"
      :rules="{
        required: true,
        between: {
          min: minMonth,
          max: maxMonth
        }
      }"
      name="Birthmonth"
    >
      <b-form-group
        id="input-group-24"
        :label="$t('label_Geboortemaand:')"
        label-for="input-24"
      >
        <b-form-select
          :value="user.month"
          :options="monthList"
          :disabled="!fieldStatus.month.rw"
          :state="errors[0] ? false : valid ? true : null"
          @input="updateValue('month', $event)"
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
      v-if="!fieldStatus.sex.hidden"
      v-slot="{ valid, errors }"
      rules="required"
      name="Sex"
    >
      <b-form-group
        id="input-group-7"
        :label="$t('label_Geslacht:')"
        label-for="input-7"
      >
        <b-form-select
          id="input-7"
          :value="user.sex"
          :options="geslacht"
          :disabled="!fieldStatus.sex.rw"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-7-live-feedback"
          @input="updateValue('sex', $event)"
        />
        <b-form-invalid-feedback id="input-7-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <b-form-group>
      <b-button
        id="popover"
        :href="require('~/assets/Maattabel-CPBE.png')"
        class="button-hero"
        variant="info"
      >
        <font-awesome-icon :icon="['fas', 'tshirt']" />
        {{ $t("Info") }}
      </b-button>
      <b-popover
        target="popover"
        triggers="hover focus"
        placement="buttom"
      >
        <b-img
          src="~/assets/Maattabel-CPBE.png"
          height="auto"
          width="600"
          alt="Responsive image"
        />
      </b-popover>
    </b-form-group>
    <ValidationProvider
      v-if="!fieldStatus.t_size.hidden"
      v-slot="{ valid, errors }"
      :rules="{ required: true }"
      name="T-shirtSize"
    >
      <b-form-group
        id="input-group-9"
        :label="$t('label_T-shirt maat:')"
        label-for="input-9"
      >
        <b-form-select
          id="input-9"
          :value="user.t_size"
          :options="tshirtsList"
          :disabled="!fieldStatus.t_size.rw"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-9-live-feedback"
          @input="updateValue('t_size', $event)"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>
              {{ $t('description_Select Tshirt size') }}
            </b-form-select-option>
          </template>
        </b-form-select>
        <b-form-invalid-feedback id="input-9-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <contact
      v-if="user"
      :contact="user.address"
      :field-status="fieldStatus.address"
      @change="updateValue('address', $event)"
    />
    <ValidationProvider
      v-if="!fieldStatus.gsm.hidden"
      v-slot="{ valid, errors }"
      :rules="{
        required: true,
        regex: /^((\+|00)32\s?|0)([1-9][0-9]\d{6})\d?$/,
      }"
      name="MobileNumber"
    >
      <b-form-group
        id="input-group-2"
        :label="$t('label_mobiel nummer (+32):')"
        :description="$t('description_Waar kunnen we jou bereiken in geval van nood')"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          :value="user.gsm"
          :disabled="!fieldStatus.gsm.rw"
          :placeholder="$t('placeholder_mobiel nummer (+32):')"
          :state="errors[0] ? false : valid ? true : null"
          type="tel"
          aria-describedby="input-2-live-feedback"
          @input="updateValue('gsm', $event)"
        />
        <b-form-invalid-feedback id="input-2-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider v-if="!fieldStatus.via.hidden" v-slot="{ valid, errors }" name="Via">
      <b-form-group
        id="input-group-10"
        :label="$t('label_Van waar ken je ons:')"
        label-for="input-10"
      >
        <b-form-input
          id="input-10"
          :value="user.via"
          :disabled="!fieldStatus.via.rw"
          :placeholder="$t('placeholder_Geef je dojo, school')"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-10-live-feedback"
          @input="updateValue('via', $event)"
        />
        <b-form-invalid-feedback id="input-10-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <div v-if="!isGuardianNeeded">
      <ValidationProvider
        v-if="!fieldStatus.medical.hidden"
        v-slot="{ valid, errors }"
        rules="max:255"
        name="Medical"
      >
        <b-form-group
          id="input-group-11"
          :label="$t('label_Zijn er aandoeningen')"
          label-for="input-11"
        >
          <b-form-textarea
            id="input-11"
            :value="user.medical"
            :disabled="!fieldStatus.medical.rw"
            :state="errors[0] ? false : valid ? true : null"
            aria-describedby="input-11-live-feedback"
            @input="updateValue('medical', $event)"
          />
          <b-form-invalid-feedback id="input-11-live-feedback">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <h2>{{ $t("Algemene vragen") }}</h2>
      <optional-questions
        v-if="user"
        :responses="user.general_questions"
        @change="updateValue('general_questions', $event)"
      />
    </div>
    <div v-else>
      <h2>{{ $t("Informatie van je ouders/voogd") }}</h2>
      <ValidationProvider
        v-if="!fieldStatus.email_guardian.hidden"
        v-slot="{ valid, errors }"
        rules="required|email"
        name="Email"
      >
        <b-form-group
          id="input-group-13"
          :label="$t('label_Email adres ouders/voogd:')"
          label-for="input-13"
          :description="$t('description_We delen dit met niemand')"
        >
          <b-form-input
            id="input-13"
            :value="user.email_guardian"
            :disabled="!fieldStatus.email_guardian.rw"
            :placeholder="$t('placeholder_Email adres ouders/voogd:')"
            :state="errors[0] ? false : valid ? true : null"
            type="email"
            aria-describedby="input-13-live-feedback"
            @input="updateValue('email_guardian', $event)"
          />
          <b-form-invalid-feedback id="input-13-live-feedback">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        v-if="!fieldStatus.gsm_guardian.hidden"
        v-slot="{ valid, errors }"
        :rules="{
          required: true,
          regex: /^((\+|00)32\s?|0)([1-9][0-9]\d{6})\d?$/,
        }"
        name="Phone"
      >
        <b-form-group
          id="input-group-14"
          :label="$t('label_mobiel nummer ouders/voogd')"
          :description="
            $t('Waar kunnen we jou bereiken in geval van nood')
          "
          label-for="input-14"
        >
          <b-form-input
            id="input-14"
            :value="user.gsm_guardian"
            :disabled="!fieldStatus.gsm_guardian.rw"
            :placeholder="$t('placeholder_mobiel nummer ouders/voogd')"
            :state="errors[0] ? false : valid ? true : null"
            type="tel"
            aria-describedby="input-14-live-feedback"
            @input="updateValue('gsm_guardian', $event)"
          />
        </b-form-group>
        <b-form-invalid-feedback id="input-14-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </ValidationProvider>
      <ValidationProvider
        v-if="!fieldStatus.medical.hidden"
        v-slot="{ valid, errors }"
        rules="max:255"
        name="Medical"
      >
        <b-form-group
          id="input-group-15"
          :label="$t('label_Zijn er aandoeningen')"
          label-for="input-15"
        >
          <b-form-textarea
            id="input-15"
            :value="user.medical"
            :disabled="!fieldStatus.medical.rw"
            :state="errors[0] ? false : valid ? true : null"
            aria-describedby="input-15-live-feedback"
            @input="updateValue('medical', $event)"
          />
          <b-form-invalid-feedback id="input-15-live-feedback">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <h2>{{ $t("Algemene vragen") }}</h2>
      <optional-questions
        v-if="user"
        :responses="user.general_questions"
        @change="updateValue('general_questions', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationProvider } from 'vee-validate'
import { addYears, differenceInYears, format, parseISO, startOfMonth } from 'date-fns'
import { enUS, fr, nl } from 'date-fns/locale'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Settings } from '~/api'

type TShirtOption = {
  text: string,
  value: number
}

type TShirtList = {
  label: string
  options?: Array<TShirtOption>
}

interface IData {
  internalUser: any,
  tshirtsList: TShirtList[],
  geslacht: Array<{text: VueI18n.TranslateResult, value: string | null}>,
  languages: Array<{text: VueI18n.TranslateResult, value: string}>
}

interface IProps {
  settings: Settings,
  user: IUser,
  fieldStatus: any
}

type YearList = {
  value: number | null,
  text: number | VueI18n.TranslateResult
}

type MonthValue = {
  value: number | null,
  text: VueI18n.TranslateResult|string
}

interface IComputed {
  startDateEvent: Date,
  beginAgeDate: Date,
  endAgeDate: Date,
  yearStart: number,
  yearList: Array<YearList>,
  monthList: Array<MonthValue> | null,
  minMonth: number,
  maxMonth: number,
  guardianAge: number,
  isGuardianNeeded: boolean
}

interface IMethods {
  updateValue(id: string, evt: any): void,
}

const locales = { enUS, nl, fr }

export default Vue.extend<IData, IMethods, IComputed, IProps>({
  components: {
    ValidationProvider
  },
  model: {
    prop: 'user',
    event: 'change'
  },
  props: {
    settings: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      default: () => {
        return {
          language: null,
          year: null,
          month: null,
          email: null,
          firstname: null,
          lastname: null,
          sex: null,
          address: {
            postalcode: null,
            street: null,
            house_number: null,
            box_number: null,
            municipality_name: null
          },
          gsm: null,
          via: null,
          medical: null,
          email_guardian: null,
          gsm_guardian: null,
          t_size: null,
          general_questions: []
        }
      }
    },
    fieldStatus: {
      type: Object,
      default: () => {
        return {
          language: {
            rw: true,
            hidden: false
          },
          year: {
            rw: true,
            hidden: false
          },
          month: {
            rw: true,
            hidden: false
          },
          email: {
            rw: true,
            hidden: false
          },
          firstname: {
            rw: true,
            hidden: false
          },
          lastname: {
            rw: true,
            hidden: false
          },
          sex: {
            rw: true,
            hidden: false
          },
          address: {
            postalcode: {
              rw: true,
              hidden: false
            },
            street: {
              rw: true,
              hidden: false
            },
            house_number: {
              rw: true,
              hidden: false
            },
            box_number: {
              rw: true,
              hidden: false
            },
            municipality_name: {
              rw: true,
              hidden: false
            }
          },
          gsm: {
            rw: true,
            hidden: false
          },
          via: {
            rw: true,
            hidden: false
          },
          medical: {
            rw: true,
            hidden: false
          },
          email_guardian: {
            rw: true,
            hidden: false
          },
          gsm_guardian: {
            rw: true,
            hidden: false
          },
          t_size: {
            rw: true,
            hidden: false
          },
          general_questions: {
            rw: true,
            hidden: false
          }
        }
      }
    }
  },
  data () {
    return {
      internalUser: Object.assign({}, this.user),
      tshirtsList: [] as Array<TShirtList>,
      geslacht: [
        { text: this.$i18n.t('placeholder_Ik ben een'), value: null },
        { value: 'f', text: this.$i18n.t('meisje') },
        { value: 'm', text: this.$i18n.t('jongen') },
        { value: 'x', text: 'X' }
      ],
      languages: [
        { value: 'nl', text: this.$i18n.t('Nederlands') },
        { value: 'fr', text: this.$i18n.t('Frans') },
        { value: 'en', text: this.$i18n.t('Engels') }
      ]
    }
  },
  async fetch () {
    const tshirts = await this.$nuxt.context.app.$http.values.tshirts()
    // get all tshirts
    this.tshirtsList = tshirts.map((element) => {
      return {
        label: element.group,
        options: element.items?.map((item) => {
          return { text: item.name, value: item.id }
        })
      }
    })
  },
  computed: {
    startDateEvent () {
      return parseISO(this.settings.officialStartDate!)
    },
    beginAgeDate () {
      return startOfMonth(addYears(this.startDateEvent, this.settings.maxAge! * -1))
    },
    endAgeDate () {
      return addYears(parseISO(this.settings.officialStartDate!), this.settings.minAge! * -1)
    },
    yearStart () {
      return this.beginAgeDate.getFullYear()
    },
    yearList () {
      const yearList = [{ text: this.$nuxt.$i18n.t('description_year'), value: null } as YearList]
      for (let i = 0; i <= this.endAgeDate.getFullYear() - this.yearStart; i++) {
        yearList.push({ text: this.yearStart + i, value: this.yearStart + i })
      }
      return yearList
    },
    guardianAge () {
      return this.settings.guardianAge!
    },
    isGuardianNeeded () {
      if (!this.user) {
        return false
      }
      return (
        differenceInYears(
          this.startDateEvent,
          new Date(this.user.year!, this.user.month!, 1)
        ) < this.guardianAge
      )
    },
    monthList () {
      if (!this.user.year) {
        return null
      }
      const monthList = [] as Array<MonthValue>
      monthList.push({ value: null, text: this.$i18n.t('placeholder_Kiesmaand') })
      if (this.user.year) {
        for (let i = 0; i < 12; i++) {
          const dat = new Date(this.internalUser.year, i, 1)

          if (dat < this.beginAgeDate || dat > this.endAgeDate) {
            continue
          }
          const locale = Object.entries(locales).find((entry) => { return entry[0].startsWith(this.$i18n.locale) })!
          monthList.push(
            { value: i, text: format(dat, 'MMMM', { locale: locale.at(1) as Locale }) }
          )
        }
      }
      return monthList
    },
    minMonth () {
      if (!this.monthList) {
        return 0
      }
      return 0 // this.monthList.at(1).value
    },
    maxMonth () {
      if (this.monthList === null) {
        return 12
      }
      return (this.monthList as any).at(-1)!.value
    }
  },
  watch: {
    user (newUser, _) {
      this.internalUser = Object.assign({}, newUser)
    }
  },
  methods: {
    updateValue (id: string, evt: any) {
      this.internalUser[id] = evt
      this.$emit('change', this.internalUser)
    }
  }
})
</script>
