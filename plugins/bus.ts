import Vue from 'vue'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $bus: Vue
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $bus: Vue
  }
}

const bus: Plugin = (_, inject) => {
  inject('bus', new Vue())
}

export default bus
