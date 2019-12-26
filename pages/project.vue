<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="ProjectName">
            <b-form-group
              id="input-group-2"
              :label="$t('ProjectName:')"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="project_name"
                :placeholder="$t('GeefProjectName:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-2-live-feedback"
              />
              <b-form-invalid-feedback id="input-2-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="ProjectDescr">
            <b-form-group
              id="input-group-1"
              :label="$t('ProjectDescr:')"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="project_descr"
                :placeholder="$t('GeefProjectDescr:')"
                :state="errors[0] ? false : (valid ? true : null)"
                aria-describedby="input-1-live-feedback"
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-form-group>
            <b-button
              type="submit"
              variant="info"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'user-edit']" /> {{ $t('Aanpassen') }}
            </b-button>
            <b-button
              type="reset"
              variant="warning"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'trash-restore']" />  {{ $t('Resetten') }}
            </b-button>
            <b-button
              type="button"
              variant="danger"
              class="button-hero"
              @click="onDeleteInfo"
            >
              <font-awesome-icon :icon="['fas', 'user-minus']" />  {{ $t('Delete') }}
            </b-button>
            <b-modal v-model="deleteInfo" ok-title="Delete" @ok="onDelete">
              Project wordt gedelete
            </b-modal>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'authenticated',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      deleteInfo: false
    }
  },
  computed: {
    project_name: {
      set (value) {
        this.$store.commit('project/project_name', value)
      },
      get () {
        return this.$store.state.project.project_name
      }
    },
    project_descr: {
      set (value) {
        this.$store.commit('project/project_descr', value)
      },
      get () {
        return this.$store.state.project.project_descr
      }
    },
    ...mapState('project', [
      'project_type',
      'project_lang'
    ])
  },
  async asyncData ({ store, query, app, redirect, route }) {
    // load projectData & store in userstore
    const projectData = await axios.get('/api/projectinfo', { headers: { api_key: store.state.auth.api_key } })
    await store.dispatch('project/updateProject', projectData.data)
  },
  methods: {
    async onSubmit (evt) {
      try {
        const projectData = await this.$axios.$patch('/api/projectinfo', this.$store.getters['project/projectinfo'], { headers: { api_key: this.$store.state.auth.api_key } })
        await this.$store.dispatch('project/updateProject', projectData)
      } catch (error) {
        this.variant = 'danger'
        this.message = this.$i18n.t('failedReg')
        this.show = true
      }
      window.scrollTo(0, 0)
    },
    async onReset (evt) {
      const projectData = await this.$axios.$get('/api/projectinfo', { headers: { api_key: this.$store.state.auth.api_key } })
      await this.$store.dispatch('project/updateProject', projectData)
    },
    onDeleteInfo (evt) {
      this.deleteInfo = true
    },
    async onDelete (evt) {
      await this.$axios.$delete('/api/projectinfo', { headers: { api_key: this.$store.state.auth.api_key } })
    }
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Project"
  },
  "fr": {
    "title": "Project"
  },
  "nl": {
    "title": "Project"
  }
}
</i18n>

<style>
</style>
