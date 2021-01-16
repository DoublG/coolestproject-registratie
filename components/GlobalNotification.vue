<template>
  <div>
    <b-alert :show="show" :variant="variant" dismissible>
      {{ message }}
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
      message: null
    }
  },
  created () {
    this.$bus.$on('display-msg', (message, variant) => {
      this.message = message
      this.variant = variant
      this.show = true
    })
    this.$bus.$on('clear-msg', () => {
      this.show = false
      this.message = null
      this.variant = null
    })
  },
  methods: {
  }
}
</script>
<style></style>
