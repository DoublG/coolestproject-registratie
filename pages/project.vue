<template>
  <b-row>
    <b-col>
      <h1 v-if="own_project">{{ $t('title') }}</h1>
      <h1 v-else>{{ $t('titleOther', { owner: project_owner }) }}</h1>
      <b-alert dismissible :show="show" :variant="variant">
        {{ message }}
      </b-alert>
      <div v-if="project_visible">
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
                  :disabled="disabled"
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
                  :disabled="disabled"
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
                  :disabled="disabled"
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
                  :disabled="disabled"
                />
                <b-form-invalid-feedback id="input-21-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <div v-if="own_project">
              <h2>{{ $t('participants') }}</h2>
              <b-table
                striped
                hover
                :items="participants"
                :fields="[{ key: 'used', label: 'In Use' }, { key: 'id', label: 'Token' }, { key: 'name', label: 'Name' }]"
              >
                <template v-slot:cell(used)="data">
                  <font-awesome-icon :icon="['fas', 'check']" v-if="data.item.name !== undefined" />
                </template>
                <template v-slot:cell(id)="data">
                  <span v-if="data.item.name === undefined">
                    {{ data.item.id }}
                  </span>
                  <span v-else>
                    {{ $t('tokenInUse') }}
                  </span>
                </template>
              </b-table>
            </div>
            <div v-else>
              <h2>{{ $t('participants') }}</h2>
              <b-table
                striped
                hover
                :items="participants"
                :fields="[{ key: 'name', label: 'Name' }]"
              >
                <template v-slot:cell(id)="data">
                  <span v-if="data.item.name === undefined">
                    {{ data.item.id }}
                  </span>
                </template>
              </b-table>
            </div>
            <ActionBarProject
              :createMode="createState"
              :displayMode="!own_project"
              :editMode="!createState && own_project"
              :addPossible="remaining_tokens > 0"
              @deleteProject="onDelete"
              @createToken="onAddToken"
              @cancel="onCancel"
            />
          </b-form>
        </ValidationObserver>
      </div>
      <div v-if="!project_visible && !createTokenState">
        <ActionBarProject
          :noProjectMode="true"
          @createProject="onCreateProject"
          @enterToken="onEnterToken"
          @cancel="onCancel"
        />
      </div>
      <div v-if="!project_visible && createTokenState">
        <ValidationObserver ref="observer" v-slot="{ passes }">
          <b-form @submit.prevent="passes(onTokenSubmit)" @reset.prevent="onTokenReset">
            <ValidationProvider v-slot="{ valid, errors }" rules="required|max:36|min:36" name="ProjectCode">
              <b-form-group
                id="input-group-22"
                :label="$t('Projectcode:')"
                label-for="input-22"
                :description="$t('Geef de code in die je van de projecteigenaar gekregen hebt')"
              >
                <b-form-input
                  id="input-22"
                  v-model="project_code"
                  placeholder="Code"
                  :state="errors[0] ? false : (valid ? true : null)"
                  aria-describedby="input-22-live-feedback"
                />
                <b-form-invalid-feedback id="input-22-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ActionBarProject
              :createMode="true"
              @cancel="onCancel"
            />
          </b-form>
        </ValidationObserver>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState } from 'vuex'
import ActionBarProject from '~/components/ActionBarProject.vue'

export default {
  middleware: 'authenticated',
  components: {
    ValidationObserver,
    ValidationProvider,
    ActionBarProject
  },
  data () {
    return {
      show: false,
      createTokenState: false,
      variant: 'success',
      message: this.$i18n.t('successReg'),
      createState: false,
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
      'project_owner'
    ]),
    project_visible () {
      return this.hasProject || this.createState
    },
    disabled () {
      return !this.own_project
    },
    project_name: {
      set (value) {
        this.$store.commit('project/project_name', value)
      },
      get () {
        return this.$store.state.project.project_name
      }
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
    async onTokenSubmit (evt) {
      try {
        // link to project
        const projectData = await this.$axios.$post('/api/projectinfo', this.$store.getters['project/tokeninfo'], { headers: { api_key: this.$store.state.auth.api_key } })
        this.onCancel(evt)
        this.variant = 'success'
        this.message = this.$i18n.t('successChange')
        this.show = true
        if (projectData !== '') {
          await this.$store.dispatch('project/updateProject', projectData)
        }
      } catch (error) {
        this.variant = 'danger'
        console.error(error)
        this.message = this.$i18n.t('failedChange')
        this.show = true
      }
    },
    async onSubmit (evt) {
      try {
        let projectData = null
        if (this.createState && !this.createTokenState) {
          // create new project
          projectData = await this.$axios.$post('/api/projectinfo', this.$store.getters['project/projectinfo'], { headers: { api_key: this.$store.state.auth.api_key } })
          this.onCancel(evt)
        } else {
          // update existing project
          projectData = await this.$axios.$patch('/api/projectinfo', this.$store.getters['project/projectinfo'], { headers: { api_key: this.$store.state.auth.api_key } })
        }
        this.variant = 'success'
        this.message = this.$i18n.t('successChange')
        this.show = true
        if (projectData !== '') {
          await this.$store.dispatch('project/updateProject', projectData)
        }
      } catch (error) {
        this.variant = 'danger'
        console.error(error)
        this.message = this.$i18n.t('failedChange')
        this.show = true
      }
      window.scrollTo(0, 0)
    },
    async onReset (evt) {
      // load projectData & store in userstore
      try {
        const projectData = await axios.get('/api/projectinfo', { headers: { api_key: this.$store.state.auth.api_key } })
        if (projectData.data !== '') {
          await this.$store.dispatch('project/updateProject', projectData.data)
        }
      } catch (error) {}
    },
    async onDelete (evt) {
      await this.$axios.$delete('/api/projectinfo', { headers: { api_key: this.$store.state.auth.api_key } })
      await this.$store.dispatch('project/updateProject', null)
    },
    onCreateProject (evt) {
      this.project_lang = this.$i18n.locale
      this.own_project = true
      this.createState = true
    },
    onEnterToken (evt) {
      this.createTokenState = true
    },
    async onAddToken (evt) {
      try {
        await this.$axios.$post('/api/participants', null, { headers: { api_key: this.$store.state.auth.api_key } })
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
    onCancel (evt) {
      this.project_lang = null
      this.own_project = false
      this.createState = false
      this.createTokenState = false
    }
  }
}
</script>

<i18n>
{
  "en": {
    "titleOther": "Project van {owner}",
    "tokenInUse": "Voucher in use",
    "AddToken": "Add Participant",
    "failedReg": "Registration failed, try again later",
    "title": "Project",
    "participants": "Participants",
    "personal_info": "Personal information",
    "no_photo": "CoderDojo is fun so we like sharing that with the world. During our activities, we take pictures that may appear on social media afterwards so it could be the case that you get photographed or filmed during one of these CoderDojo activities. We don't use this footage on flyers or campaign without explicitly asking for permission. If you rather don't want your picture to be used, you can mention this at your registration.",
    "no_contact": "You can contact me for future events",
    "YESp": "Yes",
    "NOp": "No",
    "YESc": "Yes",
    "NOc": "No",
    "Informatie van je ouders/voogd": "Your parents / guardian info",
    "Algemene vragen": "General Questions",
    "Project": "Project",
    "eigenProject": "I have my own project",
    "medeProject": "I participate in an existing project",
    "taalJury": "In which language do you want to explain the project to the jury?",
    "We delen dit met niemand": "We don’t share this with anyone",
    "Waar kunnen we jou bereiken in geval van nood": "Where can we reach you in case of an emergency?",
    "Selecteer wat je project allemaal doet, nodig heeft": "Select what your project does, needs",
    "Geef de code in die je van de projecteigenaar gekregen hebt": "Enter the code that you received from the project owner",
    "Je moet akkoord": "You must agree to the following question in order to register",
    "E-mail adres:": "E-mail address",
    "Geboortejaar:": "Year of birth:",
    "Geboortemaand:": "Birth month:",
    "Voornaam:": "First Name:",
    "Achternaam:": "Last Name:",
    "Geslacht:": "I am a ..:",
    "T-shirt maat:": "T-shirt size:",
    "Postcode:": "Postal Code:",
    "mobiel nummer (+32):": "mobile number (+32):",
    "Van waar ken je ons:": "Where do you know us from:",
    "Zijn er aandoeningen": "Are there any conditions or allergies that we should take into account:",
    "E-mail adres ouders/voogd:": "E-mail address parents / guardian:",
    "mobiel nummer ouders/voogd": "mobile number parents / guardian",
    "Is er nog extra informatie": "Is there any additional information that we must take into account:",
    "Taal:": "Language:",
    "Projecttype:": "Project type:",
    "Projectnaam:": "Project name:",
    "Omschrijving:": "Description:",
    "Projectcode:": "Project code:",
    "GeefVoornaam:": "Enter your first name",
    "GeefAchternaam:": "Enter your last name",
    "Geef je dojo, school": "Give your dojo, school, ..",
    "GeefProjectnaam:": "Enter project name:",
    "januari": "January",
    "februari": "February",
    "maart": "March",
    "april": "April",
    "mei": "May",
    "juni": "June",
    "juli": "July",
    "augustus": "August",
    "september": "September",
    "oktober": "October",
    "november": "November",
    "december": "December",
    "Kiesmaand": "Select a month",
    "Ik ben een": "I am a..",
    "meisje": "Girl",
    "jongen": "Boy",
    "kiesmaat": "Choose a size",
    "Ik schrijf me in": "I register",
    "verwijder alles": "delete all",
    "successReg": "Registration is successful, you will receive an email shortly with which you can log in to our website",
    "Ikbenakkoord": "I agree with the general conditions",
    "Project_Type": "What is in your project about hardware, software, network on WiFi or on cable,...."
  },
  "fr": {
    "titleOther": "Project van {owner}",
    "tokenInUse": "Voucher in use",
    "AddToken": "Add Participant",
    "participants": "Participants",
    "failedReg": "L'enregistrement a échoué, réessayez plus tard",
    "title": "Projet",
    "personal_info": "Informations personnelles",
    "no_photo": "Nous aimons promotionner notre action à travers les réseaux sociaux et pour ce faire nous prenons des photos pendant nos événements.Sachez que tu pourrait être photographié ou filmé lors de sa participation à notre evenement. Ces photos sont ensuite postées et partagées sur nos réseaux sociaux. Celles-ci ne sont pas imprimées, et ne figurent pas sur nos brochures. Si toutes fois, quelques photos devaient servir à des fins de campagnes promotionnelles plus étendues, nous vous demanderons bien sûr votre accord avant diffusion. Si vous ne tenez pas à ce que les photos de vous soient utilisées, nous vous remercions de nous en faire part lors de votre enregistrement.",
    "no_contact": "Nous respectons vos données personnelles ! Pour plus d’infos, consultez notre clause de confidentialité sur notre site web.Pouvons-nous vous informer des événements Coolest Projects ultérieurs par e-mail?",
    "YESp": "oui",
    "NOp": "non",
    "YESc": "oui",
    "NOc": "non",
    "Informatie van je ouders/voogd": "Informations de vos parents / tuteurs",
    "Algemene vragen": "Questions d'ordre général",
    "Project": "Projet",
    "eigenProject": "J'ai mon propre projet",
    "medeProject": "Je participe à un projet existant",
    "taalJury": "Dans quelle langue souhaitez-vous expliquer le projet au jury?",
    "We delen dit met niemand": "Nous ne partageons cela avec personne",
    "Waar kunnen we jou bereiken in geval van nood": "Où pouvons-nous vous joindre en cas d'urgence?",
    "Selecteer wat je project allemaal doet, nodig heeft": "Sélectionnez ce que votre projet fait, a besoin",
    "Geef de code in die je van de projecteigenaar gekregen hebt": "Entrez le code que vous avez reçu du propriétaire du projet",
    "Je moet akkoord": "Vous devez accepter la question suivante pour vous inscrire",
    "Email adres:": "Adresse e-mail",
    "Geboortejaar:": "Année de naissance:",
    "Geboortemaand:": "Mois de naissance:",
    "Voornaam:": "Prénom:",
    "Achternaam:": "nom de famille:",
    "Geslacht:": "Je suis un(e)..:",
    "T-shirt maat:": "T-shirt taille:",
    "Postcode:": "Code postal:",
    "mobiel nummer (+32):": "numéro de portable (+32):",
    "Van waar ken je ons:": "d’ Où vous connaissez nous?:",
    "Zijn er aandoeningen": "Y a-t-il des conditions ou des allergies dont nous devons tenir compte:",
    "Email adres ouders/voogd:": "Adresse e-mail parents / tuteur:",
    "mobiel nummer ouders/voogd": "parents / tuteurs du numéro de portable",
    "Is er nog extra informatie": "Existe-t-il des informations supplémentaires dont nous devrions tenir compte:",
    "Taal:": "Langue:",
    "Projecttype:": "Type de projet:",
    "Projectnaam:": "Nom du projet:",
    "Omschrijving:": "Description:",
    "Projectcode:": "Code de projet:",
    "GeefVoornaam:": "Entrez votre prénom",
    "GeefAchternaam:": "Entrez votre nom de famille",
    "Geef je dojo, school": "Donnez votre dojo, école, ..",
    "GeefProjectnaam:": "Entrez le nom du projet",
    "januari": "janvier",
    "februari": "février",
    "maart": "mars",
    "april": "avril",
    "mei": "mai",
    "juni": "juin",
    "juli": "juillet",
    "augustus": "août",
    "september": "septembre",
    "oktober": "octobre",
    "november": "novembre",
    "december": "décembre",
    "Kiesmaand": "Sélectionnez un mois",
    "Kiesjaar": "Sélectionnez une année",
    "Ik ben een": "Je suis un(e)..",
    "meisje": "Fille",
    "jongen": "Garçon",
    "kiesmaat": "Choisissez une taille",
    "Ik schrijf me in": "Je m'inscris",
    "verwijder alles": "tout supprimer",
    "successReg": "L'inscription est réussie, vous recevrez sous peu un e-mail avec lequel vous pourrez vous connecter à notre site Web",
    "Ikbenakkoord": "Vous devez accepter la question suivante pour vous inscrire",
    "Project_Type": "Quel est dans votre projet matériel, logiciel, réseau sur WiFi ou sur câble,...."
  },
  "nl": {
    "titleOther": "Project van {owner}",
    "tokenInUse": "Voucher in use",
    "AddToken": "Add Participant",
    "participants": "Participants",
    "failedReg": "Registratie mislukt, probeer later nog eens opnieuw",
    "title": "Project",
    "personal_info": "Persoonlijke informatie",
    "no_photo": "CoderDojo is leuk en daarom tonen wij graag waar we mee bezig zijn. We nemen tijdens onze activiteiten foto’s van onze deelnemers en begeleiders die we daarna op sociale media plaatsen. Het kan gebeuren dat je gefotografeerd of gefilmd wordt tijdens ons event. Wij gebruiken dit beeldmateriaal niet op flyers of voor uitvoerige campagnes zonder hiervoor nog eens expliciet toestemming te vragen. Indien je liever geen foto’s van je gebruikt ziet worden, kan je dat tijdens het registreren aangeven.",
    "no_contact": "We respecteren je data. Bekijk daarom zeker even ons privacy statement op de website. Mogen we jou via mail op de hoogte brengen over volgende Coolest Projects evenementen?",
    "YESp": "Dat is geen probleem",
    "NOp": "Gelieve geen foto’s en filmpjes te gebruiken waarop de deelnemer herkenbaar is",
    "YESc": "Je mag mij contacteren wanneer ik kan inschrijven voor een volgende evenement",
    "NOc": "Bewaar mijn data niet en contacteer mij niet",
    "Informatie van je ouders/voogd":"Informatie van je ouders/voogd",
    "Algemene vragen": "Algemene vragen",
    "Project": "Project",
    "eigenProject": "Ik heb mijn eigen project",
    "medeProject": "Ik werk mee aan een bestaand project",
    "taalJury": "In welke taal wil je het project uitleggen aan de jury?",
    "We delen dit met niemand": "We delen dit met niemand",
    "Waar kunnen we jou bereiken in geval van nood": "Waar kunnen we jou bereiken in geval van nood?",
    "Selecteer wat je project allemaal doet, nodig heeft": "Selecteer wat je project allemaal doet, nodig heeft",
    "Geef de code in die je van de projecteigenaar gekregen hebt": "Geef de code in die je van de projecteigenaar gekregen hebt",
    "Je moet akkoord": "Je moet akkoord gaan met volgende vraag om je te kunnen inschrijven",
    "Email adres:": "E-mail adres",
    "Geboortejaar:": "Geboortejaar:",
    "Geboortemaand:": "Geboortemaand:",
    "Voornaam:": "Voornaam:",
    "Achternaam:": "Achternaam:",
    "Geslacht:": "Ik ben een..:",
    "T-shirt maat:": "T-shirt maat:",
    "Postcode:": "Postcode:",
    "mobiel nummer (+32):": "mobiel nummer (+32):",
    "Van waar ken je ons:": "Van waar ken je ons:",
    "Zijn er aandoeningen": "Zijn er aandoeningen of allergieën waar we rekening mee moeten houden:",
    "Email adres ouders/voogd:": "E-mail adres ouders/voogd:",
    "mobiel nummer ouders/voogd": "mobiel nummer ouders/voogd",
    "Is er nog extra informatie": "Is er nog extra informatie waar we rekening mee moeten houden:",
    "Taal:": "Taal:",
    "Projecttype:": "Projecttype:",
    "ProjectName:": "Projectnaam:",
    "ProjectDescr:": "Omschrijving:",
    "Projectcode:": "Projectcode:",
    "GeefAchternaam:": "Geef je achternaam in",
    "GeefVoornaam:": "Geef je voornaam in:",
    "Geef je dojo, school": "Geef je dojo, school, ..",
    "GeefProjectnaam:": "Geef project naam:",
    "januari": "januari",
    "februari": "februari",
    "maart": "maart",
    "april": "april",
    "mei": "mei",
    "juni": "juni",
    "juli": "juli",
    "augustus": "augustus",
    "september": "september",
    "oktober": "october",
    "november": "november",
    "december": "december",
    "Kiesmaand": "Kies een maand",
    "Kiesjaar": "Kies een jaar",
    "Ik ben een": "Ik ben een..",
    "meisje": "Meisje",
    "jongen": "Jongen",
    "kiesmaat": "Kies een maat",
    "Ik schrijf me in": "Ik schrijf me in",
    "verwijder alles": "VERWIJDER ALLES",
    "successReg": "De registratie is gelukt, je ontvangt zo dadelijk een mailtje waarmee je kan inloggen op onze website",
    "Ikbenakkoord": "Ik ben akkoord met de algemene voorwarden",
    "Project_Type": "Wat zit er in jouw project aan hardwere, software, netwerk via wifi of via kabel,...."
  }
}
</i18n>

<style>
</style>
