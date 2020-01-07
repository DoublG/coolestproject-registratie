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
          <A href="mailto:info@coolestprojects.be?SUBJECT=CoolestProjectsRegistration">
            HELPDESK
          </A>
        </b>
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
    "start": "Start registration",
    "rules": "Coolest projects Belgium",
    "intro": "At Coolest Projects Belgium, young makers showcase their digital creativity. Will you join us?",
    "agree": "By registering you agree to the following rules:",
    "problems": "Still unclear or you have more questions or problems with the registration, please contact our",
    "rule1": "Registrations are open between <b>January 13th and April 20th</b> or until the maximum capacity of 64 projects is reached.",
    "rule2": "A participant is <b>between 7 and 18 years old.</b>",
    "rule3": "All projects are welcome, from beginner to advanced. All technologies are accepted (also unfinished projects)",
    "rule4": "<b>After registration the participant receives a confirmation mail.They need to click on the link to make sure the registration is valid.</b>",
    "rule5": "You can collaborate with <b>up to 4 participants</b> for one project. All participants need to register.First the project owner registers the project. After confirmation, all the other participants can join this project after receiving an invitation mail from the project owner with a registration token.",
    "rule6": "After registrations the participants can change the <b>user</b> information on the project.Only the project owner can change his <b>project</b> information. All changes need to be <b>final at May 3rd.</b></b>",
    "rule7": "We only provide a t-shirt and goodie bag to registered participants.</b>",
    "rule8": "There will be a few awards. A list of the different awards will be displayed on our website before the event. Judging for the awards will be on the day in the chosen language during the registration. All decisions from the judges are final.",
    "rule9": "We respect your data. You can read the privacy statement on the CoderDojo Belgium website."
  },
  "fr": {
    "start": "Commencer l'enregistrement",
    "rules": "Coolest projects Belgium",
    "intro": "Chez Coolest Projects Belgium, les jeunes créateurs présentent leur créativité numérique. Voulez-vous vous joindre à nous?",
    "agree": "En vous inscrivant, vous acceptez les règles suivantes:",
    "problems": "Vous n'êtes toujours pas clair ou vous avez d'autres questions ou problèmes avec l'inscription, veuillez contacter notre",
    "rule1": "Les inscriptions sont ouvertes entre le <b> 13 janvier et le 20 avril </b> ou jusqu'à ce que la capacité maximale de 64 projets soit atteinte.",
    "rule2": "Un participant a <b>entre 7 et 18 ans</b>",
    "rule3": "Tous les projets sont les bienvenus, du débutant au confirmé. Toutes les technologies sont acceptées (également les projets inachevés) ",
    "rule4": "<b>Après inscription, le participant reçoit un mail de confirmation. Il doit cliquer sur le lien pour s'assurer que l'inscription est valide.</b>",
    "rule5": "Vous pouvez collaborer avec <b> jusqu'à 4 participants </b> pour un même projet. Tous les participants doivent s'enregistrer. Tout d'abord, le propriétaire du projet enregistre le projet. Après confirmation, tous les autres participants peuvent rejoindre ce projet après avoir reçu un courrier d'invitation du propriétaire du projet avec un jeton d'enregistrement.",
    "rule6": "Après les inscriptions, les participants peuvent modifier les informations <b> utilisateur </b> sur le projet. Seul le propriétaire du projet peut modifier ses informations <b> projet </b>. Toutes les modifications doivent être <b> définitives au 3 mai</b>",
    "rule7": "Nous fournissons uniquement un t-shirt et un sac à cadeaux aux participants inscrits. </b>",
    "rule8": "Il y aura quelques prix. Une liste des différents prix sera affichée sur notre site Web avant l'événement. Le jugement des prix sera le jour dans la langue choisie lors de l'inscription. Toutes les décisions des juges sont finales.",
    "rule9": "Nous respectons vos données. Vous pouvez lire la déclaration de confidentialité sur le site Web de CoderDojo Belgium."
  },
  "nl": {
    "start": "Start registratie",
    "rules": "Coolest projects Belgium",
    "intro": "Bij Coolest Projects Belgium tonen jonge makers hun digitale creativiteit. Doe je mee?",
    "agree": "Door u te registreren gaat u akkoord met de volgende regels:",
    "problems": "Nog steeds onduidelijk of heeft u nog vragen of problemen met de registratie, neem dan contact op met onze",
    "rule1": "Inschrijvingen zijn open tussen <b>13 januari en 20 april</b> of tot de maximale capaciteit van 64 projecten is bereikt.",
    "rule2": "Een deelnemer moet <b>tussen 7 en 18 jaar oud zijn op de dag van Coolest Project.</b>",
    "rule3": "Alle projecten zijn welkom, van beginner tot expert. Alle technologieën worden geaccepteerd (ook onafgewerkte projecten)",
    "rule4": "<b>Na registratie ontvang je een bevestigingsmail. Je moeten op de link klikken om de registratie af te ronden.</b>",
    "rule5": "Je kunt met <b>maximaal 4 vrienden</b> deelnemen voor één project. Alle deelnemers moeten zich zelf registreren na dat de projecteigenaar zijn project heeft aangemeld. Na ontvangst van een uitnodigingsmail van de projecteigenaar met een registratietoken kunnen jullie ook registreren met deze token",
    "rule6": "Na registratie kunnen jullie de <b>persoonlijke</b> informatie wijzigen. Alleen de projecteigenaar kan zijn <b>project</b> informatie wijzigen. Alle wijzigingen moeten <b>op 3 mei definitief zijn.</b>",
    "rule7": "<b>We bieden alleen een t-shirt en een goodiebag aan geregistreerde deelnemers.</b>",
    "rule8": "Er zullen enkele prijzen zijn. Een lijst daarvan zal vóór het evenement op onze website worden getoond. Beoordeling voor de projecten gebeurd op de dag zelf in de tijdens de registratie gekozen taal. Alle beslissingen van de juryleden zijn definitief.",
    "rule9": "Wij respecteren uw gegevens. U kunt de privacyverklaring lezen op de website van CoderDojo België."
  }
}
</i18n>
