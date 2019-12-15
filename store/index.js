import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['registration', 'auth']
})
export const plugins = [vuexLocal.plugin]

export const state = () => ({
  startDateEvent: new Date(2020, 5, 16),
  maxAge: 18,
  minAge: 5,
  geslacht: [
    { text: 'Ik ben een../Je suis un../I am a..', value: null },
    { value: 'f', text: 'Meisje/Fille/Girl' },
    { value: 'm', text: 'Jongen/Garçon/Boy' },
    { value: 'x', text: 'X' }
  ],
  shirtsize: [
    { text: 'Kies een maat/Choisissez une taille/Choose a size', value: null },
    // Meisje/Fille/Girl
    { value: 'female_small', text: 'Meisje/Fille/Girl............. S' },
    { value: 'female_medium', text: 'Meisje/Fille/Girl............. M' },
    { value: 'female_large', text: 'Meisje/Fille/Girl............. L' },
    { value: 'female_xl', text: 'Meisje/Fille/Girl............. XL' },
    { value: 'female_xxl', text: 'Meisje/Fille/Girl............. XXL' },
    { value: 'female_3xl', text: 'Meisje/Fille/Girl............. 3XL' },
    // Jongen/Garçon/Boy
    { value: 'male_small', text: 'Jongen/Garçon/Boy..... S' },
    { value: 'male_medium', text: 'Jongen/Garçon/Boy.... M' },
    { value: 'male_large', text: 'Jongen/Garçon/Boy..... L' },
    { value: 'male_xl', text: 'Jongen/Garçon/Boyn... XL' },
    { value: 'male_xxl', text: 'Jongen/Garçon/Boy..... XXL' },
    { value: 'male_3xl', text: 'Jongen/Garçon/Boy..... 3XL' }
  ],
  project_types: [
    { value: 'scratch', text: 'Scratch' },
    { value: 'hardware', text: 'Hardware' },
    { value: 'software', text: 'Software' },
    { value: 'wifi', text: 'Wifi' },
    { value: 'kabel', text: 'Kabelnetwerk' }
  ],
  languages: [
    { value: 'nl', text: 'Nederlands' },
    { value: 'fr', text: 'Frans' },
    { value: 'en', text: 'Engels' }
  ],
  general_questions_fotos: [
    { value: 'photo', text: 'Ik ben akkoord dat er fotos genomen worden' }
  ],
  general_questions_contact: [
    { value: 'contact', text: 'Je mag me contacteren voor de volgende events' }
  ],
  mandatory_approvals_list: [
    { value: 'ok', text: 'Ik ben akkoord met de algemene voorwaarden' }
  ]
})
