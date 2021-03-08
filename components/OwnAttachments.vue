<template>
  <div>
    <b-table
      :items="attachments"
      hover
      striped
      :fields="['name','url','size','actions']"
    >
      <template #cell(url)="data">
        <b-link :href="data.item.url">
          <font-awesome-icon :icon="['fas', 'download']" /> Download
        </b-link>
      </template>
      <template #cell(size)="data">
        {{ (data.item.size / 1e+6).toFixed(2) }} megabytes
      </template>
      <template #cell(actions)="data">
        <b-button
          class="button-hero"
          @click="showPopup=true;file_id=data.item.id;"
        >
          <font-awesome-icon :icon="['fas', 'download']" />  {{ $t('Delete') }}
        </b-button>
      </template>
    </b-table>
    <b-modal v-model="showPopup" title="Delete file" ok-title="delete file" @ok="onDelete">
      <span>
        Delete file
      </span>
    </b-modal>
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
    attachments: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      showPopup: false,
      file_id: -1
    }
  },
  methods: {
    onDelete (evt) {
      this.$emit('deleteFile', this.file_id)
    }
  }
}
</script>
<style>
</style>
