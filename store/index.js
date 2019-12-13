import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['registration']
})
export const plugins = [vuexLocal.plugin]

export const state = () => ({
  startDateEvent: new Date(2020, 5, 16),
  maxAge: 18,
  minAge: 5,
  geslacht: [
    { text: 'Ik ben een', value: null },
    { value: 'f', text: 'Meisje' },
    { value: 'm', text: 'Jongen' },
    { value: 'x', text: 'X' }
  ],
  shirtsize: [
    { text: 'Kies een maat', value: null },
    // meisje
    { value: 'female_small', text: 'Meisje S' },
    { value: 'female_medium', text: 'Meisje M' },
    { value: 'female_large', text: 'Meisje L' },
    { value: 'female_xl', text: 'Meisje XL' },
    { value: 'female_xxl', text: 'Meisje XXL' },
    { value: 'female_3xl', text: 'Meisje 3XL' },
    // jongen
    { value: 'male_small', text: 'Jongen S' },
    { value: 'male_medium', text: 'Jongen M' },
    { value: 'male_large', text: 'Jongen L' },
    { value: 'male_xl', text: 'Jongen XL' },
    { value: 'male_xxl', text: 'Jongen XXL' },
    { value: 'male_3xl', text: 'Jongen 3XL' }
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
