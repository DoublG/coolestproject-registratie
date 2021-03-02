<template>
  <div>
    <b-table
      :items="attachments"
      :fields="[{ key: 'id', label: 'title' }]"
      hover
      striped
    >
      <template v-slot:cell(id)="data">
        {{ data.item.id }}
        <!-- <span v-if="data.item.name === undefined">
          {{ data.item.id }}
          <b-button :href="mailToken(data.item.id)"><font-awesome-icon :icon="['fas', 'envelope']" /> Mail</b-button>
          <b-button @click="copyToClipboard(data.item.id)"><font-awesome-icon :icon="['fas', 'copy']" /> Copy</b-button>
        </span>
        <span v-else>
          <font-awesome-icon :icon="['fas', 'check']" /> {{ $t('tokenInUse') }}
        </span> -->
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  components: {
  },
  model: {
    prop: 'attachements',
    event: 'change'
  },
  props: {
    attachements: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style>
</style>
