<template>
  <div>
    <div v-if="!$fetchState.pending">
      <ValidationProvider
        v-slot="{ valid, errors }"
        :rules="{ required: true, all_true: { all: approvals.map((i) => { return i.value } ) , selected: responses } }"
        name="MandatoryApprovals"
      >
        <b-form-group>
          <template v-slot:description>
            <NuxtLink target="_blank" :to="localePath('index')">
              {{ $t('description_Je moet akkoord') }}
            </NuxtLink>
          </template>
          <b-form-checkbox-group
            id="mandatory-approvals"
            :checked="internal_responses"
            :options="approvals"
            :state="errors[0] ? false : valid ? true : null"
            aria-describedby="mandatory-approvals-live-feedback"
            @input="change_selection($event)"
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
    return {
      internal_responses: [...this.responses],
      approvals: [],
      change_selection (evt) {
        this.$emit('change', evt)
      }
    }
  },
  watch: {
    responses (newResponse, oldResponse) {
      this.internal_responses = [...newResponse]
    }
  },
  methods: {
    reset () {
      this.$emit('change', this.$options.props.responses.default())
    }
  }
}
</script>
<style></style>
