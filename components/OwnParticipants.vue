<template>
  <div>
    <b-table
      :items="participants"
      :fields="[{ key: 'id', label: $t('label_MedewToken') }, { key: 'name', label: $t('label_MedewNaam') }]"
      hover
      striped
    >
      <template #cell(id)="data">
        <span v-if="data.item.name === undefined">
          {{ data.item.id }}
          <b-button :href="mailToken(data.item.id)"><font-awesome-icon :icon="['fas', 'envelope']" /> Mail</b-button>
          <b-button @click="copyToClipboard(data.item.id)"><font-awesome-icon :icon="['fas', 'copy']" /> Copy</b-button>
        </span>
        <span v-else>
          <font-awesome-icon :icon="['fas', 'check']" /> {{ $t('tokenInUse') }}
        </span>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  components: {
  },
  model: {
    prop: 'participants',
    event: 'change'
  },
  props: {
    participants: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    copyToClipboard (token) {
      this.$emit('copyToClipboard', token)
    },

    mailToken (token) {
      let ddot = ''
      if (window.location.port) { ddot = ':' }
      const fullUrl = window.location.protocol + '//' + window.location.hostname + ddot + window.location.port + ((this.$i18n.locale !== 'nl') ? '/' + this.$i18n.locale : '') + '/registration' + '?token=' + token
      return 'mailto:' + this.$i18n.t('mail') + '?subject=' + this.$i18n.t('subject') + '&body=' + this.$i18n.t('body') + ' ' + fullUrl + this.$i18n.t('closure')
    }
  }
}
</script>
<style>
</style>
