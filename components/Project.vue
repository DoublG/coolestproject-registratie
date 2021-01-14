<template>
  <b-row>
    <b-col>
      <h1 v-if="own_project">
        {{ $t('titleProject') }}
      </h1>
      <h1 v-if="own_project === false">
        {{ $t('titleOther', { owner: project_owner }) }}
      </h1>
      <h1 v-if="create">
        {{ $t('createProject') }}
      </h1>
      <b-alert :show="info === 'movie_received'" variant="success">
        {{ $t('MovieRec') }}
      </b-alert>
      <b-alert :show="show" :variant="variant" dismissible>
        {{ message }}
      </b-alert>
      <b-alert :show="submitURL !== null && info !== 'movie_received'" variant="warning">
        <span v-html="$t('SendMovie', { url: submitURL })" />
      </b-alert>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required" name="Language">
            <b-form-group
              id="input-group-18"
              :label="$t('label_Taal:')"
              :description="$t('description_taalJury')"
              label-for="select-18"
            >
              <b-form-select
                id="select-18"
                v-model="project_lang"
                :options="languages"
                :state="errors[0] ? false : (valid ? true : null)"
                :disabled="disabled"
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
              :label="$t('label_Project_Type')"
              label-for="input-166"
            >
              <b-form-textarea
                id="input-166"
                v-model="project_type"
                :state="errors[0] ? false : (valid ? true : null)"
                :disabled="disabled"
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
              :label="$t('label_Projectnaam:')"
              label-for="input-20"
            >
              <b-form-input
                id="input-20"
                v-model="project_name"
                :placeholder="$t('placeholder_GeefProjectnaam:')"
                :state="errors[0] ? false : (valid ? true : null)"
                :disabled="disabled"
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
              :label="$t('label_Omschrijving:')"
              label-for="input-21"
            >
              <b-form-textarea
                id="input-21"
                v-model="project_descr"
                :state="errors[0] ? false : (valid ? true : null)"
                :disabled="disabled"
                aria-describedby="input-21-live-feedback"
              />
              <b-form-invalid-feedback id="input-21-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <div v-if="!create">
            <div v-if="own_project">
              <h2>{{ $t('participants') }}</h2>
              <b-table
                :items="participants"
                :fields="[{ key: 'id', label: $t('label_MedewToken') }, { key: 'name', label: $t('label_MedewNaam') }]"
                hover
                striped
              >
                <template v-slot:cell(id)="data">
                  <span v-if="data.item.name === undefined">
                    {{ data.item.id }}
                    <b-button :href="mailToken(data.item.id)"><font-awesome-icon :icon="['fas', 'envelope']" /> Mail</b-button>
                    <b-button @click="copyToClipboard(data.item.id)"><font-awesome-icon :icon="['fas', 'copy']" /> Copy</b-button>
                  </span>
                  <span v-else>
                    <font-awesome-icon :icon="['fas', 'check']" /> {{ $t('tokenInUse') }}
                  </span>
                </template>
              </b-table>
            </div>
            <div v-else>
              <h2>{{ $t('participants') }}</h2>
              <b-table
                :items="participants"
                :fields="[{ key: 'name', label: $t('label_MedewNaam') }]"
                striped
                hover
              >
                <template v-slot:cell(name)="data">
                  <font-awesome-icon v-if="data.item.self" :icon="['fas', 'user-circle']" /> {{ data.item.name }}
                </template>
              </b-table>
            </div>
          </div>
          <ActionBarProject
            :create="create"
            :cancel="create"
            :update="!create && own_project"
            :reset="!create && own_project"
            :add="!create && remaining_tokens > 0 && own_project"
            :del="!create && delete_possible"
            :own="own_project"
            @deleteProject="onDelete"
            @createToken="onAddToken"
            @cancel="onCancel"
          />
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState } from 'vuex'
import ActionBarProject from '~/components/ActionBarProject.vue'
import messageMixin from '~/mixins/messages.js'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    ActionBarProject
  },
  mixins: [
    messageMixin
  ],
  props: {
    create: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      variant: 'success',
      message: this.$i18n.t('successReg'),
      languages: [
        { value: 'nl', text: 'Nederlands' },
        { value: 'fr', text: 'Frans' },
        { value: 'en', text: 'Engels' }
      ]
    }
  },
  computed: {
    ...mapState('project', [
      'participants',
      'remaining_tokens',
      'project_owner',
      'delete_possible',
      'info'
    ]),
    ...mapState(
      ['submitURL']
    ),
    project_name: {
      set (value) {
        this.$store.commit('project/project_name', value)
      },
      get () {
        return this.$store.state.project.project_name
      }
    },
    disabled () {
      return !this.create && !this.own_project
    },
    own_project: {
      set (value) {
        this.$store.commit('project/own_project', value)
      },
      get () {
        return this.$store.state.project.own_project
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
    project_code: {
      set (value) {
        this.$store.commit('project/project_code', value)
      },
      get () {
        return this.$store.state.project.project_code
      }
    }
  },
  methods: {
    copyToClipboard (token) {
      navigator.clipboard.writeText(token)
    },
    mailToken (token) {
      return this.$i18n.t('mail', { token })
    },
    async onSubmit (evt) {
      try {
        let projectData = null
        if (this.create) {
          // create new project
          projectData = await this.$services.projectinfo.post()
          await this.$store.dispatch('project/updateProject', projectData)
          this.$router.push('project')
        } else {
          // update existing project
          projectData = await this.$services.projectinfo.patch()
        }
        this.variant = 'success'
        this.message = this.$i18n.t('successChange')
        this.show = true
      } catch (error) {
        this.variant = 'danger'
        this.message = this.$i18n.t('failedChange')
        this.show = true
        window.scrollTo(0, 0)
      }
    },
    async onAddToken (evt) {
      try {
        await this.$services.participant.post()
        await this.onReset()
        this.variant = 'success'
        this.message = this.$i18n.t('AddToken')
        this.show = true
      } catch (error) {
        this.variant = 'danger'
        this.message = error
        this.show = true
      }
    },
    async onReset (evt) {
      // load projectData & store in userstore
      try {
        const projectData = await this.$services.projectinfo.get()
        if (projectData.data !== '') {
          await this.$store.dispatch('project/updateProject', projectData)
        }
      } catch (error) {}
    },
    async onDelete (evt) {
      await this.$services.projectinfo.delete()
      await this.$store.dispatch('project/updateProject', null)
      this.$router.push('no_project')
    },
    onCancel (evt) {
      this.$router.push('no_project')
    }
  }
}
</script>
<style>
</style>
