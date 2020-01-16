<template>
  <b-row>
    <b-col>
      <h1>{{ $t('CreateViaToken') }}</h1>
      <b-alert :show="show" :variant="variant" dismissible>
        {{ message }}
      </b-alert>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onTokenSubmit)" @reset.prevent="onTokenReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required|max:36|min:36" name="ProjectCode">
            <b-form-group
              id="input-group-22"
              :label="$t('Projectcode:')"
              :description="$t('Geefcode')"
              label-for="input-22"
            >
              <b-form-input
                id="input-22"
                v-model="project_code"
                :state="errors[0] ? false : (valid ? true : null)"
                placeholder="Code"
                aria-describedby="input-22-live-feedback"
              />
              <b-form-invalid-feedback id="input-22-live-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ActionBarProject
            @cancel="onCancel"
            create
            cancel
          />
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ActionBarProject from '~/components/ActionBarProject.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    ActionBarProject
  },
  data () {
    return {
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
    async onTokenSubmit (evt) {
      try {
        // link to project
        const projectData = await this.$services.projectinfo.post_token()
        this.variant = 'success'
        this.message = this.$i18n.t('successChange')
        this.show = true
        if (projectData !== '') {
          await this.$store.dispatch('project/updateProject', projectData)
        }
        this.$router.push('project')
      } catch (error) {
        this.variant = 'danger'
        // eslint-disable-next-line no-console
        console.error(error)
        this.message = this.$i18n.t('failedChange')
        this.show = true
      }
    },
    onCancel (evt) {
      this.$router.push('no_project')
    }
  }
}
</script>

<i18n>
{
  "en": {
    "failedChange": "The change was unsuccessful, please LOGOUT and Login again",
    "Geefcode": "Enter the code that you received from the project owner",
    "Projectcode:": "Project token",
    "successReg": "The registration for the creation of your project is successful when you get a confirmation mail with further instructions to login and to see and/or change your data. Be aware: 1 registration per person.",
    "successChange": "The change was successful."
  },
  "fr": {
    "failedChange": "Le changement a échoué, DÉCONNEXION et retour Connexion",
    "Geefcode": "Entre le code reçu via le propriétaire du projet",
    "Projectcode:": "Jeton du projet",
    "successReg": "Inscription réussie ! Vous recevrez d'ici peu un e-mail avec lequel vous pourrez vous connecter à notre site Web",
    "successChange": "De wijziging is gelukt."
  },
  "nl": {
    "failedChange": "De wijziging is niet gelukt.",
    "Geefcode": "Geef de code in die je van de projecteigenaar gekregen hebt",
    "Projectcode:": "Project token",
    "successReg": "De registratie voor het aanmaken van je project is gelukt als je een bevestigingsmail ontvangt met verdere instructies om in te loggen en je gegevens te bekijken en/of bij te werken. Let op: 1 registratie per projectowner.",
    "successChange": "De wijziging is niet gelukt, LOGOUT en do terug Login."
  }
}
</i18n>

<style>
</style>
