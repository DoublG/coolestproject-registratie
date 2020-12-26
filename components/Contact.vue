<template>
  <div>
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
          :value="contact.postalcode"
          :placeholder="$t('Postcode:')"
          :state="errors[0] ? false : valid ? true : null"
          type="number"
          aria-describedby="input-1-live-feedback"
          @input="update_value('postalcode', $event)"
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
          :value="contact.street"
          :placeholder="$t('Street')"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-1z-live-feedback"
          @input="update_value('street', $event)"
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
          :value="contact.house_number"
          :placeholder="$t('HouseNumber')"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-2z-live-feedback"
          @input="update_value('house_number', $event)"
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
          :value="contact.bus_number"
          :placeholder="$t('BusNumber')"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-3z-live-feedback"
          @input="update_value('bus_number', $event)"
        />
        <b-form-invalid-feedback id="input-3z-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider v-slot="{ valid, errors }" name="MunicipalityName">
      <b-form-group
        id="input-group-3zz"
        :label="$t('MunicipalityName')"
        label-for="input-3zz"
      >
        <b-form-input
          id="input-3zz"
          :value="contact.municipality_name"
          :placeholder="$t('MunicipalityName')"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-3zz-live-feedback"
          @input="update_value('municipality_name', $event)"
        />
        <b-form-invalid-feedback id="input-3zz-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
  </div>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  model: {
    prop: 'contact',
    event: 'change'
  },
  props: {
    contact: {
      type: Object,
      default: () => {
        return {
          postalcode: null,
          street: null,
          house_number: null,
          bus_number: null,
          municipality_name: null
        }
      }
    }
  },
  async fetch () {},
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    update_value (id, evt) {
      this.$set(this.contact, id, evt)
      this.$emit('change', this.contact)
    }
  }
}
</script>
