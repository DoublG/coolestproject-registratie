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
            :checked="responseIntern[ question.id ]"
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

<script lang="ts">
import { ValidationProvider } from 'vee-validate'
import Vue from 'vue'
import { Question } from '~/api'

export default Vue.extend({
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
      get_options (question:Question) {
        return [
          { value: question.id, text: question.positive },
          { value: '_', text: question.negative }
        ]
      },
      questions: [] as Array<Question>
    }
  },
  async fetch () {
    this.questions = await this.$nuxt.context.app.$http.values.questions()
  },
  computed: {
    responseIntern () {
      const internal = {} as {[key:string]:number|string}
      for (const question of this.questions) {
        if (this.responses.includes(question.id)) {
          internal[question.id] = question.id
        } else {
          internal[question.id] = '_'
        }
      }
      return internal
    }
  },
  methods: {
    change_selection (id: string | number, evt: string | number) {
      // copy & change response
      // const oldResponse = Object.assign({}, this.responseIntern)
      this.responseIntern[id] = evt
      const responses = []
      for (const [, value] of Object.entries(this.responseIntern)) {
        if (value === '_') {
          continue
        }
        responses.push(value)
      }
      this.$emit('change', responses)
    }
  }
})
</script>

<style></style>
