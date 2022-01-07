<template>
  <div>
    <ValidationProvider
      v-if="!fieldStatus.project_code.hidden"
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
          :disabled="!fieldStatus.project_code.rw"
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
    },
    fieldStatus: {
      type: Object,
      default: () => {
        return {
          project_code: {
            rw: true,
            hidden: false
          }
        }
      }
    }
  },
  data () {
    return {
      internal_project: Object.assign({}, this.project)
    }
  },
  async fetch () {},
  watch: {
    project (newProject, oldProject) {
      this.internal_project = Object.assign({}, newProject)
    }
  },
  methods: {
    reset () {
      this.$emit('change', this.$options.props.project.default())
    },
    update_value (id, evt) {
      this.internal_project[id] = evt
      this.$emit('change', this.internal_project)
    }
  }
}
</script>
