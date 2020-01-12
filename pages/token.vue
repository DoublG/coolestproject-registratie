<template>
  <b-row>
    <b-col>
      <h1>{{ $t('CreateViaToken') }}</h1>
      <b-alert dismissible :show="show" :variant="variant">
        {{ message }}
      </b-alert>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onTokenSubmit)" @reset.prevent="onTokenReset">
          <ValidationProvider v-slot="{ valid, errors }" rules="required|max:36|min:36" name="ProjectCode">
            <b-form-group
              id="input-group-22"
              :label="$t('Projectcode:')"
              label-for="input-22"
              :description="$t('Geefcode')"
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
            create
            cancel
            @cancel="onCancel"
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
    "Achternaam:": "Last Name",
    "AddToken": "Add Participant",
    "Algemene vragen": "General Questions",
    "april": "April",
    "augustus": "August",
    "CreateViaToken": "Add me to another project",
    "december": "December",
    "E-mail adres ouders/voogd:": "E-mail address parents / guardian",
    "E-mail adres:": "E-mail address parents / guardian",
    "eigenProject": "I have my own project",
    "failedReg": "Registration failed try again later",
    "februari": "February",
    "Geboortejaar:": "Year of birth",
    "Geboortemaand:": "Birth month",
    "Geef je dojo, school": "Give your dojo, school ..",
    "GeefAchternaam:": "Enter your last name",
    "Geefcode": "Enter the code that you received from the project owner",
    "GeefProjectnaam:": "Enter project name",
    "GeefVoornaam:": "Enter your first name",
    "Geslacht:": "I am a ..",
    "Ik ben een": "I am a..",
    "Ik schrijf me in": "I register",
    "Ikbenakkoord": "I agree with the general conditions",
    "Informatie van je ouders/voogd": "Your parents / guardian info",
    "Is er nog extra informatie": "Is there any additional information we must take into account",
    "januari": "January",
    "Je moet akkoord": "You must agree to the following question in order to register",
    "jongen": "Boy",
    "juli": "July",
    "juni": "June",
    "Kiesmaand": "Select a month",
    "kiesmaat": "Choose a size",
    "maart": "March",
    "MakeChoice": "Make a choice",
    "medeProject": "I participate in an existing project",
    "mei": "May",
    "meisje": "Girl",
    "mobiel nummer (+32):": "mobile number (+32)",
    "mobiel nummer ouders/voogd": "mobile number parents / guardian (+32)",
    "no_contact": "You can contact me for future events",
    "no_photo": "CoderDojo is fun so we like sharing that with the world. During our activities we take pictures that may appear on social media afterwards so it could be the case that you get photographed or filmed during one of these CoderDojo activities. We don't use this footage on flyers or campaign without explicitly asking for permission. If you rather don't want your picture to be used you can mention this at your registration.",
    "NOc": "No",
    "NOp": "No",
    "november": "November",
    "oktober": "October",
    "Omschrijving:": "Description",
    "participants": "Participant",
    "personal_info": "Personal information",
    "Postcode:": "Postal Code",
    "Project": "Project",
    "Project_Type": "What is in your project about hardware software network on WiFi or on cable....",
    "Projectcode:": "Project token",
    "Projectnaam:": "Project name",
    "Projecttype:": "Project type",
    "Selecteer wat je project allemaal doet, nodig heeft": "Select what your project needs",
    "september": "September",
    "successReg": "Registration is successful you will receive an email shortly with which you can log in to our website",
    "T-shirt maat:": "T-shirt size",
    "Taal:": "Language",
    "taalJury": "In which language do you want to explain the project to the jury?",
    "title": "User",
    "titleOther": "Project of {owner}",
    "tokenInUse": "Voucher in use",
    "Van waar ken je ons:": "Where do you know us from",
    "verwijder alles": "delete all",
    "Voornaam:": "First Name",
    "Waar kunnen we jou bereiken in geval van nood": "Where can we reach you in case of an emergency?",
    "We delen dit met niemand": "We don’t share this with anyone",
    "YESc": "Yes",
    "YESp": "Yes",
    "Zijn er aandoeningen": "Are there any conditions or allergies that we should take into account"
  },
  "fr": {
    "Achternaam:": "Nom de Famille",
    "AddToken": "Add Participant",
    "Algemene vragen": "Questions d'ordre général",
    "april": "avril",
    "augustus": "août",
    "CreateViaToken": "Ajoutez-moi à un autre projet",
    "december": "décembre",
    "eigenProject": "J'ai mon propre projet",
    "Email adres ouders/voogd:": "Adresse mail des parents / tuteur",
    "Email adres:": "Adresse mail des parents / tuteur",
    "failedReg": "L'inscription a échoué - Essaie à nouveau",
    "februari": "février",
    "Geboortejaar:": "Année de naissance",
    "Geboortemaand:": "Mois de naissance",
    "Geef je dojo, school": "Précise le nom de ton Dojo ..",
    "GeefAchternaam:": "Mentionne ton nom de famille",
    "Geefcode": "Entre le code reçu via le propriétaire du projet",
    "GeefProjectnaam:": "Entrez le nom du projet",
    "GeefVoornaam:": "Mentionne ton prénom",
    "Geslacht:": "Je suis un(e)..",
    "Ik ben een": "Je suis un(e)..",
    "Ik schrijf me in": "Je m'inscris",
    "Ikbenakkoord": "Tu dois accepter la question suivante pour t'inscrire",
    "Informatie van je ouders/voogd": "Informations concernant vos parents / tuteur",
    "Is er nog extra informatie": "Y-a t'il des informations supplémentaires dont nous devrions tenir compte ?",
    "januari": "janvier",
    "Je moet akkoord": "Tu dois accepter la question suivante pour t'inscrire",
    "jongen": "Garçon",
    "juli": "juillet",
    "juni": "juin",
    "Kiesjaar": "Sélectionne une année",
    "Kiesmaand": "Sélectionne un mois",
    "kiesmaat": "Choisis une taille",
    "maart": "mars",
    "MakeChoice": "Faites un choix",
    "medeProject": "Je participe à un projet existant",
    "mei": "mai",
    "meisje": "Fille",
    "mobiel nummer (+32):": "numéro de gsm (+32)",
    "mobiel nummer ouders/voogd": "parents / tuteurs du  (+32)",
    "no_contact": "Nous respectons vos données personnelles ! Pour plus d’infos consultez notre clause de confidentialité sur notre site web. Pouvons-nous vous informer des prochains événements Coolest Projects par e-mail?",
    "no_photo": "CoderDojo c'est tellement fun que nous aimons promotionner notre action à travers les réseaux sociaux et pour ce faire nous prenons des photos pendant nos événements. Chaque participant(e) pourrait être photographié ou filmé lors de sa participation à notre événement. Ces photos sont ensuite postées et partagées sur nos réseaux sociaux. Celles-ci ne sont pas imprimées et ne figurent pas sur nos brochures. Si toutes fois quelques photos devaient servir à des fins de campagnes promotionnelles plus étendues nous vous demanderons bien sûr votre accord avant diffusion. Si vous ne tenez pas à ce que ces photos soient utilisées nous vous remercions de nous en faire part lors de votre enregistrement.",
    "NOc": "Non",
    "NOp": "Non",
    "november": "novembre",
    "oktober": "octobre",
    "Omschrijving:": "Description",
    "participants": "Participant",
    "personal_info": "Informations personnelles",
    "Postcode:": "Code postal",
    "Project": "Projet",
    "Project_Type": "Qu'en est-il de votre projet au niveau matériel hardware, logiciel, réseau via WiFi ou par câble....",
    "Projectcode:": "Jeton du projet",
    "Projectnaam:": "Nom du projet",
    "Projecttype:": "Type de projet",
    "Selecteer wat je project allemaal doet, nodig heeft": "Sélectionnez les besoins de votre projet réalisé",
    "september": "septembre",
    "successReg": "Inscription réussie ! Vous recevrez d'ici peu un e-mail avec lequel vous pourrez vous connecter à notre site Web",
    "T-shirt maat:": "Taille de T-shirt",
    "Taal:": "Langue",
    "taalJury": "Dans quelle langue souhaitez-vous présenter le projet au jury?",
    "title": "Utilisateur",
    "titleOther": "Projet de {owner}",
    "tokenInUse": "Bon/Voucher en cours d'utilisation",
    "Van waar ken je ons:": "Où avez-vous entendu parlé de CoderDojo pour la première fois?",
    "verwijder alles": "tout supprimer",
    "Voornaam:": "Prénom",
    "Waar kunnen we jou bereiken in geval van nood": "Où pouvons-nous vous joindre en cas d'urgence?",
    "We delen dit met niemand": "Nous ne divulguerons ceci à personne",
    "YESc": "Oui",
    "YESp": "Oui",
    "Zijn er aandoeningen": "Y a-t-il des conditions ou des allergies dont nous devons tenir compte"
  },
  "nl": {
    "Achternaam:": "Achternaam",
    "AddToken": "Deelnemer toevoegen",
    "Algemene vragen": "Algemene vragen",
    "april": "april",
    "augustus": "augustus",
    "CreateViaToken": "Mij aan een andere project toevoegen",
    "december": "december",
    "eigenProject": "Ik heb mijn eigen project",
    "Email adres ouders/voogd:": "E-mail adres ouders/voogd",
    "Email adres:": "E-mail adres ouders/voogd",
    "failedReg": "Registratie mislukt probeer later nog eens opnieuw",
    "februari": "februari",
    "Geboortejaar:": "Geboortejaar",
    "Geboortemaand:": "Geboortemaand",
    "Geef je dojo, school": "Geef je dojo, school ..",
    "GeefAchternaam:": "Geef je achternaam in",
    "Geefcode": "Geef de code in die je van de projecteigenaar gekregen hebt",
    "GeefProjectnaam:": "Geef project naam",
    "GeefVoornaam:": "Geef je voornaam in",
    "Geslacht:": "Ik ben een..",
    "Ik ben een": "Ik ben een..",
    "Ik schrijf me in": "Ik schrijf me in",
    "Ikbenakkoord": "Ik ben akkoord met de algemene voorwaarden",
    "Informatie van je ouders/voogd": "Informatie van je ouders/voogd",
    "Is er nog extra informatie": "Is er nog extra informatie waar we rekening mee moeten houden",
    "januari": "januari",
    "Je moet akkoord": "Je moet akkoord gaan met volgende vraag om je te kunnen inschrijven",
    "jongen": "Jongen",
    "juli": "juli",
    "juni": "juni",
    "Kiesjaar": "Kies een jaar",
    "Kiesmaand": "Kies een maand",
    "kiesmaat": "Kies een maat",
    "maart": "maart",
    "MakeChoice": "Make a choice",
    "medeProject": "Ik werk mee aan een bestaand project",
    "mei": "mei",
    "meisje": "Meisje",
    "mobiel nummer (+32):": "mobiel nummer (+32)",
    "mobiel nummer ouders/voogd": "mobiel nummer ouders/voogd (+32)",
    "no_contact": "We respecteren je data. Bekijk daarom zeker even ons privacy statement op de website. Mogen we jou via mail op de hoogte brengen over volgende Coolest Projects evenementen?",
    "no_photo": "CoderDojo is leuk en daarom tonen wij graag waar we mee bezig zijn. We nemen tijdens onze activiteiten foto’s van onze deelnemers en begeleiders die we daarna op sociale media plaatsen. Het kan gebeuren dat je gefotografeerd of gefilmd wordt tijdens ons event. Wij gebruiken dit beeldmateriaal niet op flyers of voor uitvoerige campagnes zonder hiervoor nog eens expliciet toestemming te vragen. Indien je liever geen foto’s van je gebruikt ziet worden kan je dat tijdens het registreren aangeven.",
    "NOc": "Bewaar mijn data niet en contacteer mij niet",
    "NOp": "Gelieve geen foto’s en filmpjes te gebruiken waarop de deelnemer herkenbaar is",
    "november": "november",
    "oktober": "oktober",
    "participants": "Deelnemer",
    "personal_info": "Persoonlijke informatie",
    "Postcode:": "Postcode",
    "Project": "Project",
    "Project_Type": "Wat zit er in jouw project aan hardware software netwerk via wifi of via kabel....",
    "Projectcode:": "Project token",
    "ProjectDescr:": "Projectomschrijving",
    "ProjectName:": "Projectnaam",
    "Projecttype:": "Projecttype",
    "Selecteer wat je project allemaal doet, nodig heeft": "Selecteer wat je project allemaal nodig heeft",
    "september": "september",
    "successReg": "De registratie is gelukt je ontvangt zo dadelijk een mailtje waarmee je kan inloggen op onze website",
    "T-shirt maat:": "T-shirt maat",
    "Taal:": "Taal",
    "taalJury": "In welke taal wil je het project uitleggen aan de jury?",
    "title": "Gebruiker",
    "titleOther": "Project van {owner}",
    "tokenInUse": "Voucher in gebruik",
    "Van waar ken je ons:": "Van waar ken je ons",
    "verwijder alles": "VERWIJDER ALLES",
    "Voornaam:": "Voornaam",
    "Waar kunnen we jou bereiken in geval van nood": "Waar kunnen we jou bereiken in geval van nood?",
    "We delen dit met niemand": "We delen dit met niemand",
    "YESc": "Je mag mij contacteren wanneer ik kan inschrijven voor een volgende evenement",
    "YESp": "Dat is geen probleem",
    "Zijn er aandoeningen": "Zijn er aandoeningen of allergieën waar we rekening mee moeten houden"
  }
}
</i18n>

<style>
</style>
