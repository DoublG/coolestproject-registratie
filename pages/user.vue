<template>
  <b-row>
    <b-col>
      <h1>{{ $t("titleUser") }}</h1>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <user v-model="user" read-only />
          <h2>{{ $t("Mandatory Approvals") }}</h2>
          <mandatory-questions v-model="user.mandatory_approvals" />
          <ActionBarProject
            update
            :del="user.delete_possible"
            reset
          />
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver } from 'vee-validate'

export default {
  middleware: 'authenticated',
  components: {
    ValidationObserver
  },
  async asyncData ({ store, query, app, redirect, route }) {
    const user = await app.$services.userinfo.get()
    return {
      user
    }
  },
  data () {
    return {
    }
  },
  methods: {
    async onSubmit (evt) {
      await this.$services.userinfo.patch(this.user)
      window.scrollTo(0, 0)
    },
    async onReset (evt) {
      this.user = await this.$services.userinfo.get()
    },
    onDeleteInfo (evt) {
      this.deleteInfo = true
    },
    async onDelete (evt) {
      await this.$services.userinfo.delete()
      this.logout()
      this.$router.push({ path: 'login' })
    }
  }
}
</script>

<style>
</style>
