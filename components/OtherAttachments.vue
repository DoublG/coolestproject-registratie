<template>
  <div>
    <b-table
      :items="attachments"
      hover
      striped
      :fields="fields"
    >
      <template #cell(url)="data">
        <b-link v-if="data.item.exists" :href="data.item.url">
          <font-awesome-icon :icon="['fas', 'download']" /> Download
        </b-link>
      </template>
      <template #cell(size)="data">
        {{ (data.item.size / 1e+6).toFixed(2) }} megabytes
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  components: {
  },
  model: {
    prop: 'attachments',
    event: 'change'
  },
  props: {
    fields: {
      type: Array,
      default: () => {
        return ['name', 'url', 'size']
      }
    },
    attachments: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
<style>
</style>
