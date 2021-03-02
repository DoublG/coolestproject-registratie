<template>
  <div>
    <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Title">
      <b-form-group
        id="input-group-1"
        label="Project movie"
        label-for="form-1"
      >
        <b-form-input
          id="input-1"
          v-model="internal_file.name"
          :state="errors[0] ? false : (valid ? true : null)"
          :disabled="!fieldStatus.name.rw"
          placeholder="Movie title"
          aria-describedby="input-1-live-feedback"
          @input="update_value('name', $event)"
        />
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider v-slot="{ valid, errors }" rules="required" name="File">
      <b-form-group
        id="input-group-2"
        label="Project movie"
        label-for="form-2"
      >
        <b-form-file id="form-2" v-model="internal_file.content" :state="errors[0] ? false : (valid ? true : null)" />
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
    prop: 'files',
    event: 'change'
  },
  prop: {
    files: {}
  },
  data () {
    return {
      internal_file: {
        name: '',
        content: null
      },
      fieldStatus: {
        name: {
          rw: true
        }
      }
    }
  },
  methods: {
    update_value (id, evt) {
      this.internal_file[id] = evt
      this.$emit('change', this.internal_file)
    }
  }
}
</script>
<style>
</style>
