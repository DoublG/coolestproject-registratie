<template>
  <div>
    <b-table
      :items="participants"
      :fields="[{ key: 'name', label: $t('label_MedewNaam') }]"
      striped
      hover
    >
      <template #cell(name)="data">
        <font-awesome-icon v-if="data.item.self" :icon="['fas', 'user-circle']" /> {{ data.item.name }}
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
  }
}
</script>
<style>
</style>
