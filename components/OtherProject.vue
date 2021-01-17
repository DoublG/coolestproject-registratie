<template>
  <div>
    <ValidationProvider
      v-slot="{ valid, errors }"
      rules="required|max:36|min:36"
      name="ProjectCode"
    >
      <b-form-group
        id="input-group-22"
        :label="$t('label_Projectcode:')"
        :description="$t('description_Geefcode')"
        label-for="input-22"
      >
        <b-form-input
          id="input-22"
          :value="project.project_code"
          :state="errors[0] ? false : valid ? true : null"
          placeholder="Code"
          aria-describedby="input-22-live-feedback"
          @input="update_value('project_code', $event)"
        />
        <b-form-invalid-feedback id="input-22-live-feedback">
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
    prop: 'project',
    event: 'change'
  },
  props: {
    project: {
      type: Object,
      default: () => {
        return {
          project_code: null
        }
      }
    }
  },
  async fetch () {},
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    update_value (id, evt) {
      this.$set(this.project, id, evt)
      this.$emit('change', this.project)
    }
  }
}
</script>
