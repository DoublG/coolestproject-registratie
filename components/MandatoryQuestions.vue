<template>
  <div>
    <div v-if="!$fetchState.pending">
      <ValidationProvider
        v-slot="{ valid, errors }"
        :rules="{ required: true, all_true: { all: approvals.map((i) => { return i.value } ) , selected: responses } }"
        name="MandatoryApprovals"
      >
        <b-form-group>
          <template #description>
            <NuxtLink target="_blank" :to="localePath('rules')">
              {{ $t('description_Je moet akkoord') }}
            </NuxtLink>
          </template>
          <b-form-checkbox-group
            id="mandatory-approvals"
            :checked="internalResponses"
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

<script lang="ts">
import { ValidationProvider } from 'vee-validate'
import Vue from 'vue'

type Question = {
  value: number;
  text?: string
}

interface IData {
  approvals: Array<Question>,
  internalResponses: Array<any>
}
interface IMethods{}
interface IComputed{}
interface IProps {
  responses: Array<any>
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
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
  data () {
    return {
      internalResponses: [...this.responses],
      approvals: [] as Array<Question>
    }
  },
  async fetch () {
    const approvals = await this.$nuxt.context.app.$http.values.approvals()

    this.approvals = approvals.map((item) => {
      return { value: item.id, text: item.description }
    })
  },
  watch: {
    responses (newResponse, _) {
      this.internalResponses = [...newResponse]
    }
  },
  methods: {
    change_selection (evt: any) {
      this.$emit('change', evt)
    }
  }
})
</script>
<style></style>
