<template>
  <div>
    <ValidationProvider v-slot="{ valid, errors }" rules="required|email" name="Email">
      <b-form-group
        id="input-group-1"
        label="Email adres"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="login.email"
          :state="errors[0] ? false : (valid ? true : null)"
          :disabled="!fieldStatus.email.rw"
          type="email"
          placeholder="email adres"
          aria-describedby="input-1-live-feedback"
          @input="update_value('email', $event)"
        />
        <b-form-invalid-feedback id="input-1-live-feedback">
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
    prop: 'login',
    event: 'change'
  },
  props: {
    login: {
      type: Object,
      default: () => {
        return {
          email: null
        }
      }
    },
    fieldStatus: {
      type: Object,
      default: () => {
        return {
          email: {
            rw: true
          }
        }
      }
    }
  },
  async fetch () {},
  data () {
    return {
      internal_login: Object.assign({}, this.login)
    }
  },
  computed: {
  },
  methods: {
    update_value (id, evt) {
      this.internal_login[id] = evt
      this.$emit('change', this.internal_login)
    }
  }
}
</script>
