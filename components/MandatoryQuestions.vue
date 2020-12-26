<template>
  <div>
    <div v-if="!$fetchState.pending">
      <ValidationProvider
        v-slot="{ valid, errors }"
        :rules="{ required: true, all_true: { all: approvals.map((i) => { return i.value } ) , selected: responses } }"
        name="MandatoryApprovals"
      >
        <b-form-group :description="$t('Je moet akkoord')">
          <b-form-checkbox-group
            id="mandatory-approvals"
            :checked="responses"
            :options="approvals"
            :state="errors[0] ? false : valid ? true : null"
            aria-describedby="mandatory-approvals-live-feedback"
            @change="$emit('change', $event)"
          />
          <b-form-invalid-feedback id="mandatory-approvals-live-feedback">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
    </div>
  </div>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider
  },
  model: {
    prop: 'responses',
    event: 'change'
  },
  props: {
    responses: {
      type: Array,
      default: () => []
    }
  },
  async fetch () {
    const app = await this.$nuxt.context.app.$services.approvals.get()
    this.approvals = app.map((item) => {
      return { value: item.id, text: item.description }
    })
  },
  data () {
    return {}
  }
}
</script>
<style></style>
