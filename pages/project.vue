<template>
  <b-row>
    <b-col>
      <h1 v-if="project.own_project.own_project">
        {{ $t('titleProject') }}
      </h1>
      <h1 v-else>
        {{ $t('titleOther', { owner: project.own_project.project_owner }) }}
      </h1>
      <global-notification />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onUpdateProject)" @reset.prevent="onReset">
          <own-project v-model="project.own_project" :field-status="own_project_field_status" />
          <h2>{{ $t('participants') }}</h2>
          <div v-if="project.own_project.own_project">
            <own-participants
              v-model="project.own_project.participants"
              @copyToClipboard="copyToClipboard"
            />
          </div>
          <div v-else>
            <other-participants v-model="project.own_project.participants" />
          </div>
          <h2>{{ $t('attachments') }}</h2>
          <div v-if="project.own_project.own_project">
            <own-attachments v-model="project.attachments" @deleteFile="deleteAttachment" />
          </div>
          <div v-else>
            <other-attachments v-model="project.attachments" />
          </div>
          <ActionBarProject
            :update="project.own_project.own_project"
            :reset="project.own_project.own_project"
            :add="project.own_project.remaining_tokens > 0 && project.own_project.own_project"
            :del="project.own_project.delete_possible"
            :own="project.own_project.own_project"
            :upload="project.own_project.own_project"
            @deleteProject="onDelete"
            @createToken="onAddToken"
            @cancel="onCancel"
            @upload="onUpload"
          />
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
// project.own_project.attachments
import { ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationObserver
  },
  middleware: 'authenticated',
  async asyncData ({ store, query, app, redirect, route }) {
    const project = await app.$services.projectinfo.get()
    if (project === '') {
      app.router.push(app.localePath('no_project'))
    }
    return {
      project,
      readWrite: project.own_project.own_project || false
    }
  },
  data () {
    return {
      files: null,
      readWrite: false,
      project: null
    }
  },
  computed: {
    own_project_field_status () {
      return {
        project_name: {
          rw: this.readWrite,
          hidden: false
        },
        project_descr: {
          rw: this.readWrite,
          hidden: false
        },
        project_type: {
          rw: this.readWrite,
          hidden: false
        },
        project_lang: {
          rw: this.readWrite,
          hidden: false
        }
      }
    }
  },
  methods: {
    async deleteAttachment (id) {
      await this.$services.attachments.delete(id)
      await this.onReset()
    },
    copyToClipboard (token) {
      navigator.clipboard.writeText(token)
    },
    async onUpdateProject (evt) {
      await this.$services.projectinfo.patch(this.project)
    },
    async onAddToken (evt) {
      await this.$services.participant.post()
      await this.onReset()
    },
    async onReset (evt) {
      this.project = await this.$services.projectinfo.get()
    },
    async onDelete (evt) {
      await this.$services.projectinfo.delete()
      this.$router.push(this.localePath('no_project'))
    },
    onUpload (evt) {
      this.$router.push(this.localePath('upload'))
    },
    onCancel (evt) {
      this.$router.push(this.localePath('no_project'))
    }
  }
}
</script>

<style>
</style>
