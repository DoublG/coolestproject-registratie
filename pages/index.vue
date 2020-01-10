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
        </ol>
        <b> {{ $t('problems') }}
        </b>
        <span v-html="$t('href')" />
      </p>
      <b-button variant="dark" class="button-hero" href="/registration">
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
    "rule2": "A participant is <b>between 7 and 18 years old.</b>",
    "rule3": "All projects are welcome from beginner to advanced. All technologies are accepted (also unfinished projects)",
    "rule4": "<b>After registration the participant receives a confirmation mail.They need to click on the link to make sure the registration is valid.</b>",
    "rule5": "You can collaborate with <b>up to 4 participants</b> for one project. All participants need to register.First the project owner registers the project. After confirmation all the other participants can join this project after receiving an invitation mail from the project owner with a registration token.",
    "rule6": "After registrations the participants can change the <b>user</b> information on the project.Only the project owner can change his <b>project</b> information. All changes need to be <b>final at May 3rd.</b></b>",
    "rule7": "We only provide a t-shirt and goodie bag to registered participants.</b>",
    "rule8": "There will be a few awards. A list of the different awards will be displayed on our website before the event. Judging for the awards will be on the day in the chosen language during the registration. All decisions from the judges are final.",
    "rule9": "We respect your data. You can read the privacy statement on the CoderDojo Belgium website.",
    "rules": "Coolest Projects Belgium",
    "start": "Start registration"
  },
  "fr": {
    "agree": "En vous inscrivant vous acceptez les règles suivantes",
    "intro": "Au Coolest Projects Belgium les jeunes créateurs présentent leur créativité numérique. Veux-tu te joindre à nous?",
    "problems": "Tu souhaiterais recevoir plus d'informations car c'est encore un peu flou pour toi ou tu as d'autres questions ou quelques problèmes avec ton inscription. Merci de contacter notre",
    "rule1": "Les inscriptions sont ouvertes entre le <b> 13 janvier et le 20 avril </b> ou jusqu'à ce que la capacité maximale de 64 projets soit atteinte.",
    "rule2": "Un participant a <b>entre 7 et 18 ans</b>",
    "rule3": "Tous les projets sont les bienvenus du débutant au confirmé. Toutes les technologies sont acceptées (également les projets inachevés) ",
    "rule4": "<b>Après inscription le participant reçoit un mail de confirmation. Il doit cliquer sur le lien pour s'assurer que l'inscription est valide.</b>",
    "rule5": "Vous pouvez collaborer avec <b> jusqu'à 4 participants </b> pour un même projet. Tous les participants doivent s'enregistrer. Tout d'abord le propriétaire du projet enregistre le projet. Après confirmation tous les autres participants peuvent rejoindre ce projet après avoir reçu un courrier d'invitation du propriétaire du projet avec un jeton d'enregistrement.",
    "rule6": "Après inscription, les participants peuvent modifier les informations <b> utilisateur </b> sur le projet. Seul le propriétaire du projet peut modifier ses informations <b> projet </b>. Toutes les modifications doivent être <b> définitives au 3 mai</b>",
    "rule7": "Nous fournissons un t-shirt et un sac de goodies uniquement aux participant(e)s inscrit(e)s. </b>",
    "rule8": "Il y a des prix à remporter ! Une liste des différents prix sera affichée sur notre site Web avant l'événement. La remise des prix aura lieu le jour de l'événement dans la langue choisie lors de l'inscription. Toutes les décisions des juges sont définitives.",
    "rule9": "Nous respectons vos données personnelles. A lire, notre déclaration de confidentialité sur le site Web de CoderDojo Belgium.",
    "rules": "Coolest Projects Belgium",
    "start": "Commencer l'inscription"
  },
  "nl": {
   "agree": "Door u te registreren gaat u akkoord met de volgende regels",
    "intro": "Bij Coolest Projects Belgium tonen jonge makers hun digitale creativiteit. Doe je mee?",
    "problems": "Nog steeds onduidelijk of heeft u nog vragen of problemen met de registratie neem dan contact op met onze",
    "rule1": "Inschrijvingen zijn open tussen <b>13 januari en 20 april</b> of tot de maximale capaciteit van 64 projecten is bereikt.",
    "rule2": "Een deelnemer moet <b>tussen 7 en 18 jaar oud zijn op de dag van Coolest Projects.</b>",
    "rule3": "Alle projecten zijn welkom van beginner tot expert. Alle technologieën worden geaccepteerd (ook onafgewerkte projecten)",
    "rule4": "<b>Na registratie ontvang je een bevestigingsmail. Je moeten op de link klikken om de registratie af te ronden.</b>",
    "rule5": "Je kunt met <b>maximaal 4 vrienden</b> deelnemen aan één project. Alle deelnemers moeten zich zelf registreren nadat de projecteigenaar zijn project heeft aangemeld. Na ontvangst van een uitnodigingsmail van de projecteigenaar met een registratietoken kunnen jullie ook registreren met deze token",
    "rule6": "Na registratie kunnen jullie de <b>persoonlijke</b> informatie wijzigen. Alleen de projecteigenaar kan zijn <b>project</b> informatie wijzigen. Alle wijzigingen moeten <b>op 3 mei definitief zijn.</b>",
    "rule7": "<b>We geven enkel een t-shirt en een goodiebag aan geregistreerde deelnemers.</b>",
    "rule8": "Er zullen enkele prijzen te winnen zijn. Een lijst daarvan zal vóór het evenement op onze website worden getoond. Beoordeling voor de projecten gebeurt op de dag zelf in de gekozen taal tijdens de registratie. Alle beslissingen van de juryleden zijn definitief.",
    "rule9": "Wij respecteren uw gegevens. U kunt de privacyverklaring lezen op de website van CoderDojo België.",
    "rules": "Coolest Projects Belgium",
    "start": "Start registratie",
    "href": "<a href='&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;o&#64;&#99;&#111;&#111;&#108;&#101;&#115;&#116;&#112;&#114;&#111;&#106;&#101;&#99;&#116;s&#46;&#98;&#101;?SUBJECT=CoolestProjectsRegistration'><b>HELPDESK</b></a>"
 }
}
</i18n>
