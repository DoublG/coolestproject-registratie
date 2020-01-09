export default {
  data () {
    return {
      message: null,
      variant: null,
      display: false
    }
  },
  methods: {
    clear_messages () {
      this.message = null
      this.variant = null
      this.display = false
    },
    success_message (message) {
      this.variant = 'success'
      this.display = true
      this.message = message
    },
    error_message (message) {
      this.variant = 'danger'
      this.display = true
      this.message = message
    }
  }
}
