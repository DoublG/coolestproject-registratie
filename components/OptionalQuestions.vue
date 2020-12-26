<template>
  <div>
    <div v-if="!$fetchState.pending">
      <ValidationProvider
        v-for="question in questions"
        :key="question.id"
        v-slot="{ valid, errors }"
        rules="required"
        :name="`OptionalQuestions-${ question.id }`"
      >
        <b-form-group :id="`input-group-${ question.id }`" :label="question.description">
          <b-form-radio-group
            :checked="responses[ question.id ]"
            :state="errors[0] ? false : valid ? true : null"
            :options="get_options(question)"
            stacked
            @change="change_selection(question.id, $event)"
          >
            <b-form-invalid-feedback :id="`input-live-feedback-${ question.id }`">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-radio-group>
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
      type: Object,
      default: () => {}
    }
  },
  async fetch () {
    this.questions = await this.$nuxt.context.app.$services.questions.get()
  },
  data () {
    return {
      get_options (question) {
        return [
          { value: question.id, text: question.positive },
          { value: '_', text: question.negative }
        ]
      },
      change_selection (id, evt) {
        this.$set(this.responses, id, evt)
        this.$emit('change', this.responses)
      },
      questions: []
    }
  }
}
</script>
<style></style>
