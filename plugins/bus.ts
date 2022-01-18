import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $bus: Vue
  }
}

Vue.prototype.$bus = new Vue()
