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
    <span v-if="!own">
      Link tussen project en gebruiker wordt gedelete {{ $t('LinkDelete') }}
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
    }
  }
}
</script>
<style></style>

<i18n>
{
  "en" :{
    "LinkDelete" : ""
  }
}
</i18n>
