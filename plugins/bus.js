import Vue from 'vue'

export default ({ app, store }, inject) => {
  inject('bus', new Vue())
}
