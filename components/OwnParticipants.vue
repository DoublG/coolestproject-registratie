<template>
  <div>
    <b-table
      :items="participants"
      :fields="[{ key: 'id', label: $t('label_MedewToken') }, { key: 'name', label: $t('label_MedewNaam') }]"
      hover
      striped
    >
      <template v-slot:cell(id)="data">
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
      const fullUrl = window.location.href.replace('/project', '/registration') + '?token=' + token // Dit zou $root of zo moeten zijn
      return 'mailto:' + this.$i18n.t('mail') + '?subject=' + this.$i18n.t('subject') + '&body=' + this.$i18n.t('body') + ' ' + fullUrl + this.$i18n.t('closure')
    }
  }
}
</script>
<style>
</style>
