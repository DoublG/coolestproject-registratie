<template>
  <div>
    <b-jumbotron class="bg-info" />
    <b-container>
      <h1> {{ $t('rules') }} </h1>
      <H3> {{ $t('intro') }} </H3>
      <p>
        <b> {{ $t('agree') }} </b>
      </p>
      <p>
        <ol>
          <li v-html="$t('rule1')" />
          <li v-html="$t('rule2')" />
          <li v-html="$t('rule3')" />
          <li v-html="$t('rule4')" />
          <li v-html="$t('rule5')" />
          <li v-html="$t('rule6')" />
          <li v-html="$t('rule7')" />
          <li v-html="$t('rule8')" />
          <li v-html="$t('rule9')" />
          <li v-html="$t('rule10')" />
        </ol>
        <b> {{ $t('problems') }}
        </b>
        <span v-html="$t('href')" />
      </p>
      <b-button variant="dark" class="button-hero" to="registration">
        <font-awesome-icon :icon="['fas', 'paper-plane']" /> {{ $t('start') }}
      </b-button>
    </b-container>
  </div>
</template>
<script>
export default {
  layout: 'fullwith',
  components: {
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>

<i18n>
{
  "en": {
    "agree": "By registering you agree to the following rules",
    "intro": "At Coolest Projects Belgium young makers showcase their digital creativity. Will you join us?",
    "problems": "Still unclear or you have more questions or problems with the registration please contact our",
    "rule1": "Registrations are open between <b>January 13th and April 20th</b> or until the maximum capacity of 64 projects is reached.",
    "rule2": "<b>A participant is between 7 and 18 years old and a resident of Belgium.</b>",
    "rule3": "All projects are welcome from beginner to advanced. All technologies are accepted (also unfinished projects)",
    "rule4": "<b>After registration the participant receives a confirmation mail.They need to click on the link to make sure the registration is valid.</b>",
    "rule5": "You can collaborate with <b>up to 4 participants</b> for one project. All participants need to register.  First the project owner registers the project. After confirmation, all the other participants can join  this project after receiving an invitation mail from the project owner with a registration token.",
    "rule6": "After registrations the participants can change the <b>user</b> information on the project.Only the project owner can change his <b>project</b> information. All changes need to be <b>final at May 7rd.</b></b>",
    "rule7": "We only provide a t-shirt and goodie bag to registered participants.</b>",
    "rule8": "For a valid entry, <b>you need to send in a video</b>. The duration needs to be  between 1 and 3 minutes.<b>  The video has to reach us before May 7th 23:59.</b>",
    "rule9": "We only provide a goodie to registered participants who send in a video to present their project. Obviously we <b>need your postal address</b> for this to work",
    "rule10": "We respect your data. You can read the privacy statement on the CoderDojo Belgium website.",
    "rules": "Coolest Projects Belgium",
    "start": "Start registration"
  },
  "fr": {
    "agree": "En vous inscrivant vous acceptez les règles suivantes",
    "intro": "Au Coolest Projects Belgium les jeunes créateurs présentent leur créativité numérique. Veux-tu te joindre à nous?",
    "problems": "Tu souhaiterais recevoir plus d'informations car c'est encore un peu flou pour toi ou tu as d'autres questions ou quelques problèmes avec ton inscription. Merci de contacter notre",
    "rule1": "Les inscriptions sont ouvertes entre le <b> 13 janvier et le 20 avril </b> ou jusqu'à ce que la capacité maximale de 64 projets soit atteinte.",
    "rule2": "Chaque participant.e est <b>âgé de 7 à 18 ans et réside en Belgique</b>",
    "rule3": "Tous les projets sont les bienvenus du débutant au confirmé. Toutes les technologies sont acceptées (également les projets inachevés) ",
    "rule4": "<b>Après l'inscription, chaque participant.e reçoit un courrier de confirmation, il/elle doit cliquer sur le lien pour s'assurer que l'inscription est validée.</b>",
    "rule5": "Chaque jeune peut collaborer avec un <b>maximum de 4 participants </b> pour un projet. Tous les participant.e.s doivent s'inscrire. Dans un premier temps, le propriétaire du projet enregistre le projet. Après confirmation, tous les autres participant.e.s peuvent rejoindre ce projet après avoir reçu un courrier d'invitation du propriétaire du projet avec un jeton d'enregistrement.",
    "rule6": "Après l'enregistrement, chaque participant.e peut modifier les informations d'utilisateur du projet. Seul le propriétaire du projet peut modifier les informations relatives à son projet. <b>Toutes les modifications doivent être définitives le 7 mai. </b>",
    "rule7": "Pour valider une inscription, vous devez envoyer une vidéo. La durée de la vidéo doit être comprise entre 1 et 3 minutes.  La vidéo doit nous parvenir avant le 7 mai à 23h59. </b>",
    "rule8": "Chaque participant.e, si il/elle le souhaite, pourra donner plus d'explications lors d'un appel vidéo avec un groupe d’experts. Celui-ci sera organisé à partir du 8 mai.",
    "rule9": "Nous ne fournissons un goodie qu'aux inscrits qui envoient une vidéo pour présenter leur projet. Nous avons donc besoin d’une adresse postale pour procéder à l’envoi postal.",
    "rule10": "Nous respectons vos données personnelles. A lire, notre déclaration de confidentialité sur le site Web de CoderDojo Belgium.",
    "rules": "Coolest Projects Belgium",
    "start": "Commencer l'inscription"
  },
  "nl": {
   "agree": "Door u te registreren gaat u akkoord met de volgende regels",
    "intro": "Bij Coolest Projects Belgium tonen jonge makers hun digitale creativiteit. Doe je mee?",
    "intro2": "Het is nu een corona  ONLINE LIVE SESSIE op 17 mei 2020  met videoclips en interviews van jullie projecten.",
   "problems": "Nog steeds onduidelijk of heeft u nog vragen of problemen met de registratie neem dan contact op met onze",
    "rule0": "<b>Maak en videoclip met wat uitleg over jouw project en sla het op. Stuur ons dan deze clip of sla een link op bij de project beschrijving tijdens registratie of bij een latere login. Meer uitleg gaat volgen.",
    "rule1": "Inschrijvingen zijn open tussen <b>13 januari en 20 april</b> of tot de maximale capaciteit van 64 projecten is bereikt.",
    "rule2": "Een deelnemer moet <b>tussen 7 en 18 jaar oud zijn op de dag van Coolest Projects en resident zijn in België.</b>",
    "rule3": "Alle projecten zijn welkom van beginner tot expert. Alle technologieën worden geaccepteerd (ook onafgewerkte projecten)",
    "rule4": "<b>Na registratie ontvang je een bevestigingsmail. Je moet op de link klikken om de registratie af te ronden.</b>",
    "rule5": "Je kunt met <b>maximaal 4 vrienden</b> deelnemen aan één project. Alle deelnemers moeten zich zelf registreren nadat de projecteigenaar zijn project heeft aangemeld. Na ontvangst van een uitnodigingsmail van de projecteigenaar met een registratietoken kunnen jullie ook registreren met deze token.",
    "rule6": "Na registratie kunnen jullie de <b>persoonlijke</b> informatie</b> wijzigen. Alleen de projecteigenaar kan zijn <b>project informatie</b> wijzigen. Alle wijzigingen moeten <b>op 7 mei definitief zijn.</b>",
    "rule7": "Voor een geldige deelname, <b>moet je een video van je project inzenden</b> van minimaal 1 en maximaal 3 minuten. Deze video moeten we ontvangen hebben op <b>ten laatste 7 mei 23:59u.<b>",
    "rule8": "<b>Als je dat wil, kan je meer uitleg geven over je project, tijdens een video call met een panel. Dit zal opgezet worden vanaf 8 mei.</b>",
    "rule9": "We geven enkel goodie aan geregistreerde deelnemers die een video inzenden van hun project. Hiervoor hebben we dan uiteraard het <b>postadres</b> voor nodig.",
    "rule10": "Wij respecteren uw gegevens. U kunt de privacyverklaring lezen op de website van CoderDojo België.",
    "rules": "Coolest Projects België",
    "start": "Start registratie",
    "href": "<a href='&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;o&#64;&#99;&#111;&#111;&#108;&#101;&#115;&#116;&#112;&#114;&#111;&#106;&#101;&#99;&#116;s&#46;&#98;&#101;&quest;&#x53;&#x55;&#x42;&#x4a;&#x45;&#x43;&#x54;&equals;CoolestProjectsRegistration'><b>HELPDESK</b></a>"
 }
}
</i18n>
