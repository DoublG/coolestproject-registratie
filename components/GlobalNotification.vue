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
<script>
export default {
  components: {
  },
  data () {
    return {
      show: false,
      variant: null,
      message: null,
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  created () {
    this.$bus.$on('display-msg', (message, variant, timer) => {
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
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>
<style></style>
