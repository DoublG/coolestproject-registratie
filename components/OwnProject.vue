<template>
  <div>
    <ValidationProvider
      v-slot="{ valid, errors }"
      rules="required"
      name="Language"
    >
      <b-form-group
        id="input-group-18"
        :label="$t('label_Taal:')"
        :description="$t('description_taalJury')"
        label-for="select-18"
      >
        <b-form-select
          id="select-18"
          :value="project.project_lang"
          :options="languages"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-18-live-feedback"
          :disabled="!fieldStatus.project_lang.rw"
          @input="update_value('project_lang', $event)"
        />
        <b-form-invalid-feedback id="input-18-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ valid, errors }"
      rules="max:100"
      name="ProjectType"
    >
      <b-form-group
        id="input-group-166"
        :label="$t('label_Project_Type')"
        label-for="input-166"
      >
        <b-form-textarea
          id="input-166"
          :value="project.project_type"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-166-live-feedback"
          :disabled="!fieldStatus.project_type.rw"
          @input="update_value('project_type', $event)"
        />
        <b-form-invalid-feedback id="input-166-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ valid, errors }"
      rules="required|max:100"
      name="ProjectName"
    >
      <b-form-group
        id="input-group-20"
        :label="$t('label_Projectnaam:')"
        label-for="input-20"
      >
        <b-form-input
          id="input-20"
          :value="project.project_name"
          :placeholder="$t('placeholder_GeefProjectnaam:')"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-20-live-feedback"
          :disabled="!fieldStatus.project_name.rw"
          @input="update_value('project_name', $event)"
        />
        <b-form-invalid-feedback id="input-20-live-feedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ valid, errors }"
      rules="required|max:4000"
      name="ProjectDescription"
    >
      <b-form-group
        id="input-group-21"
        :label="$t('label_Omschrijving:')"
        label-for="input-21"
      >
        <b-form-textarea
          id="input-21"
          :value="project.project_descr"
          :state="errors[0] ? false : valid ? true : null"
          aria-describedby="input-21-live-feedback"
          :disabled="!fieldStatus.project_descr.rw"
          @input="update_value('project_descr', $event)"
        />
        <b-form-invalid-feedback id="input-21-live-feedback">
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
    fieldStatus: {
      type: Object,
      default: () => {
        return {
          project_name: {
            rw: true
          },
          project_descr: {
            rw: true
          },
          project_type: {
            rw: true
          },
          project_lang: {
            rw: true
          }
        }
      }
    },
    project: {
      type: Object,
      default: () => {
        return {
          project_name: null,
          project_descr: null,
          project_type: null,
          project_lang: null
        }
      }
    }
  },
  data () {
    return {
      internal_project: Object.assign({}, this.project),
      languages: [
        { value: 'nl', text: 'Nederlands' },
        { value: 'fr', text: 'Frans' },
        { value: 'en', text: 'Engels' }
      ]
    }
  },
  watch: {
    project (newProject, oldProject) {
      this.internal_project = Object.assign({},newProject)
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
