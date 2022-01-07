<template>
  <div>
    <b-table
      :items="attachments"
      hover
      striped
      :fields="fields"
    >
      <template #cell(url)="data">
        <a :href="data.item.url" :download="data.item.filename">
          <font-awesome-icon :icon="['fas', 'download']" /> Download
        </a>
      </template>
      <template #cell(size)="data">
        {{ (data.item.size / 1e+6).toFixed(2) }} megabytes
      </template>
      <template #cell(actions)="data">
        <b-button
          v-if="!data.item.confirmed"
          class="button-hero"
          @click="showPopup=true;file_id=data.item.id;"
        >
          <font-awesome-icon :icon="['fas', 'minus']" />  {{ $t('Delete') }}
        </b-button>
        <div v-else>
          <font-awesome-icon :icon="['fas', 'check']" /> {{ $t('Is Confirmed') }}
        </div>
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
    fields: {
      type: Array,
      default: () => {
        return ['name', 'url', 'size', 'actions']
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
