<template>
  <b-row>
    <b-col>
      <h1>{{ $t('title') }}</h1>
      <div v-if="hasProject || createState">
        <ValidationObserver ref="observer" v-slot="{ passes }">
          <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
            <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Language">
              <b-form-group
                id="input-group-18"
                :label="$t('Taal:')"
                label-for="select-18"
                :description="$t('taalJury')"
              >
                <b-form-select
                  id="select-18"
                  v-model="project_lang"
                  :options="languages"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-18-live-feedback"
                />
                <b-form-invalid-feedback id="input-18-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" name="ProjectType">
              <b-form-group
                id="input-group-166"
                :label="$t('Project_Type')"
                label-for="input-166"
              >
                <b-form-textarea
                  id="input-166"
                  v-model="project_type"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-166-live-feedback"
                />
                <b-form-invalid-feedback id="input-166-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:100" name="ProjectName">
              <b-form-group
                id="input-group-20"
                :label="$t('Projectnaam:')"
                label-for="input-20"
              >
                <b-form-input
                  id="input-20"
                  v-model="project_name"
                  :placeholder="$t('GeefProjectnaam:')"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-20-live-feedback"
                />
                <b-form-invalid-feedback id="input-20-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:4000" name="ProjectDescription">
              <b-form-group
                id="input-group-21"
                :label="$t('Omschrijving:')"
                label-for="input-21"
              >
                <b-form-textarea
                  id="input-21"
                  v-model="project_descr"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-21-live-feedback"
                />
                <b-form-invalid-feedback id="input-21-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-form-group>
              <b-button
                v-if="createState"
                type="submit"
                variant="info"
                class="button-hero"
              >
                <font-awesome-icon :icon="['fas', 'user-edit']" /> {{ $t('Create') }}
              </b-button>
              <b-button
                v-else
                type="submit"
                variant="info"
                class="button-hero"
              >
                <font-awesome-icon :icon="['fas', 'user-edit']" /> {{ $t('Aanpassen') }}
              </b-button>
              <b-button
                v-if="!createState"
                type="reset"
                variant="warning"
                class="button-hero"
              >
                <font-awesome-icon :icon="['fas', 'trash-restore']" />  {{ $t('Resetten') }}
              </b-button>
              <b-button
                v-if="!createState"
                type="button"
                variant="danger"
                class="button-hero"
                @click="onDeleteInfo"
              >
                <font-awesome-icon :icon="['fas', 'user-minus']" />  {{ $t('Delete') }}
              </b-button>
              <b-modal v-model="deleteInfo" @ok="onDelete" okTitle="Delete">
                Project wordt gedelete
              </b-modal>
            </b-form-group>
          </b-form>
        </ValidationObserver>
      </div>
      <div v-else>
        <b-button
          type="button"
          variant="success"
          class="button-hero"
          @click="onCreateProject"
        >
          <font-awesome-icon :icon="['fas', 'project-diagram']" />  {{ $t('CreateProject') }}
        </b-button>
        <b-button
          type="button"
          variant="success"
          class="button-hero"
          @click="onEnterToken"
        >
          <font-awesome-icon :icon="['fas', 'user-minus']" />  {{ $t('EnterToken') }}
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'authenticated',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      deleteInfo: false,
      createState: false,
      languages: [
        { value: 'nl', text: 'Nederlands' },
        { value: 'fr', text: 'Frans' },
        { value: 'en', text: 'Engels' }
      ]
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
    project_type: {
      set (value) {
        this.$store.commit('project/project_type', value)
      },
      get () {
        return this.$store.state.project.project_type
      }
    },
    project_lang: {
      set (value) {
        this.$store.commit('project/project_lang', value)
      },
      get () {
        return this.$store.state.project.project_lang
      }
    },
    hasProject () {
      return this.$store.state.project.project_id !== null
    }
  },
  async asyncData ({ store, query, app, redirect, route }) {
    // load projectData & store in userstore
    try {
      const projectData = await axios.get('/api/projectinfo', { headers: { api_key: store.state.auth.api_key } })
      if (projectData.data !== '') {
        await store.dispatch('project/updateProject', projectData.data)
      }
    } catch (error) {}
  },
  methods: {
    async onSubmit (evt) {
      try {
        let projectData = null
        if (this.createState) {
          projectData = await this.$axios.$post('/api/projectinfo', this.$store.getters['project/projectinfo'], { headers: { api_key: this.$store.state.auth.api_key } })
          this.createState = false
        } else {
          projectData = await this.$axios.$patch('/api/projectinfo', this.$store.getters['project/projectinfo'], { headers: { api_key: this.$store.state.auth.api_key } })
        }
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
      await this.$store.dispatch('project/updateProject', null)
    },
    onCreateProject (evt) {
      this.project_lang = this.$i18n.locale
      this.createState = true
    },
    onEnterToken (evt) {}
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
