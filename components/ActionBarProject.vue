<template>
<b-form-group>
  <b-button
    type="submit"
    variant="info"
    class="button-hero"
    v-if="create"
  >
    <font-awesome-icon :icon="['fas', 'plus']" /> {{ $t('Create') }}
  </b-button>
  <b-button
    type="submit"
    variant="info"
    class="button-hero"
    v-if="update"
  >
    <font-awesome-icon :icon="['fas', 'edit']" /> {{ $t('Aanpassen') }}
  </b-button>
  <b-button
    type="reset"
    variant="warning"
    class="button-hero"
    v-if="reset"
  >
    <font-awesome-icon :icon="['fas', 'trash-restore']" />  {{ $t('Resetten') }}
  </b-button>
  <b-button
    type="button"
    variant="danger"
    class="button-hero"
    @click="onDeleteInfo"
    v-if="del"
  >
    <font-awesome-icon :icon="['fas', 'minus']" />  {{ $t('Delete') }}
  </b-button>
  <b-button
    type="button"
    variant="success"
    class="button-hero"
    @click="onCreateToken"
    v-if="add"
  >
    <font-awesome-icon :icon="['fas', 'plus']" />  {{ $t('AddToken') }}
  </b-button>
  <!-- begin project not yet created -->
  <b-button
    type="button"
    variant="success"
    class="button-hero"
    @click="onCreateProject"
    v-if="project"
  >
    <font-awesome-icon :icon="['fas', 'plus']" />  {{ $t('CreateProject') }}
  </b-button>
  <b-button
    type="button"
    variant="success"
    class="button-hero"
    @click="onEnterToken"
    v-if="token"
  >
    <font-awesome-icon :icon="['fas', 'minus']" />  {{ $t('EnterToken') }}
  </b-button>
  <!-- end project not yet created -->
  <b-button
    type="button"
    variant="success"
    class="button-hero"
    @click="onCancel"
    v-if="cancel"
  >
    <font-awesome-icon :icon="['fas', 'eject']" />  {{ $t('Cancel') }}
  </b-button>
  <b-modal v-model="showPopup" @ok="onDelete" okTitle="Delete" title="Delete Project">
    <span v-if="displayMode">
      Link tussen project en gebruiker wordt gedelete
    </span>
    <span v-else>
      Project wordt gedelete
    </span>
  </b-modal>
</b-form-group>
</template>
<script>
export default {
  props: {
    createMode: {
      type: Boolean,
      default: false
    },
    editMode: {
      type: Boolean,
      default: false
    },
    displayMode: {
      type: Boolean,
      default: false
    },
    addPossible: {
      type: Boolean,
      default: false
    },
    noProjectMode: {
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
    project () {
      return this.noProjectMode
    },
    token () {
      return this.noProjectMode
    },
    update () {
      return this.editMode
    },
    create () {
      return this.createMode
    },
    reset () {
      return this.editMode
    },
    del () {
      return (this.editMode || this.displayMode) && !this.createMode
    },
    add () {
      return this.editMode && this.addPossible
    },
    cancel () {
      return this.createMode
    }
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
    }
  }
}
</script>
<style></style>

<i18n>
{
}
</i18n>
