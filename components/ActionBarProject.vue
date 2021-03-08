<template>
  <b-form-group>
    <b-button
      v-if="create"
      type="submit"
      variant="info"
      class="button-hero"
    >
      <font-awesome-icon :icon="['fas', 'plus']" /> {{ $t('Create') }}
    </b-button>
    <b-button
      v-if="update"
      type="submit"
      variant="info"
      class="button-hero"
    >
      <font-awesome-icon :icon="['fas', 'edit']" /> {{ $t('Aanpassen') }}
    </b-button>
    <b-button
      v-if="reset"
      type="reset"
      variant="warning"
      class="button-hero"
    >
      <font-awesome-icon :icon="['fas', 'trash-restore']" />  {{ $t('Resetten') }}
    </b-button>
    <b-button
      v-if="del"
      type="button"
      variant="danger"
      class="button-hero"
      @click="onDeleteInfo"
    >
      <font-awesome-icon :icon="['fas', 'minus']" />  {{ $t('Delete') }}
    </b-button>
    <b-button
      v-if="add"
      type="button"
      variant="success"
      class="button-hero"
      @click="onCreateToken"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />  {{ $t('AddToken') }}
    </b-button>
    <!-- begin project not yet created -->
    <b-button
      v-if="project"
      type="button"
      variant="success"
      class="button-hero"
      @click="onCreateProject"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />  {{ $t('createProject') }}
    </b-button>
    <b-button
      v-if="token"
      type="button"
      variant="success"
      class="button-hero"
      @click="onEnterToken"
    >
      <font-awesome-icon :icon="['fas', 'minus']" />  {{ $t('EnterToken') }}
    </b-button>
    <!-- end project not yet created -->
    <b-button
      v-if="cancel"
      type="button"
      variant="success"
      class="button-hero"
      @click="onCancel"
    >
      <font-awesome-icon :icon="['fas', 'eject']" />  {{ $t('Cancel') }}
    </b-button>
    <!-- end project not yet created -->
    <b-button
      v-if="upload"
      type="button"
      variant="info"
      class="button-hero"
      @click="onUpload"
    >
      <font-awesome-icon :icon="['fas', 'upload']" />  {{ $t('Upload') }}
    </b-button>
    <b-modal v-model="showPopup" :title="deleteMsgTitle" :ok-title="okDeleteMsg" @ok="onDelete">
      <span>
        {{ deleteMsg }}
      </span>
    </b-modal>
  </b-form-group>
</template>
<script>
export default {
  props: {
    deleteMsg: {
      type: String,
      default () { return this.$t('project_delete') }
    },
    deleteMsgTitle: {
      type: String,
      default () { return this.$t('Delete') }
    },
    okDeleteMsg: {
      type: String,
      default () { return this.$t('Delete') }
    },
    upload: {
      type: Boolean,
      default: false
    },
    project: {
      type: Boolean,
      default: false
    },
    token: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    create: {
      type: Boolean,
      default: false
    },
    reset: {
      type: Boolean,
      default: false
    },
    del: {
      type: Boolean,
      default: false
    },
    add: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Boolean,
      default: false
    },
    own: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showPopup: false
    }
  },
  computed: {
  },
  mounted () {},
  methods: {
    onDeleteInfo (evt) {
      this.showPopup = true
    },
    onDelete (evt) {
      this.$emit('deleteProject')
    },
    onCreateProject (evt) {
      this.$emit('createProject')
    },
    onEnterToken (evt) {
      this.$emit('enterToken')
    },
    onCreateToken (evt) {
      this.$emit('createToken')
    },
    onCancel (evt) {
      this.$emit('cancel')
    },
    onUpload (evt) {
      this.$emit('upload')
    }
  }
}
</script>
<style></style>
