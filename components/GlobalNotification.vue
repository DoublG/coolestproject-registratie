<template>
  <div>
    <b-alert
      :variant="variant"
      dismissible
      :show="dismissCountDown || show"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      {{ message }}
      <b-progress
        v-show="dismissCountDown > 0"
        :variant="variant"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      />
    </b-alert>
  </div>
</template>
<script lang="ts">

import Vue from 'vue'
import VueI18n from 'vue-i18n'

export default Vue.extend({
  components: {
  },
  data () {
    return {
      show: false,
      variant: null as string|null,
      message: null as VueI18n.TranslateResult|null,
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  created () {
    this.$bus.$on('display-msg', (message: VueI18n.TranslateResult, variant: string, timer: boolean) => {
      this.message = message
      this.variant = variant

      if (timer) {
        this.dismissCountDown = this.dismissSecs
      } else {
        this.show = true
      }
    })
    this.$bus.$on('clear-msg', () => {
      this.show = false
      this.message = null
      this.variant = null
    })
  },
  methods: {
    countDownChanged (dismissCountDown: number) {
      this.dismissCountDown = dismissCountDown
    }
  }
})
</script>
<style></style>
