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
      @click="onDeleteInfo"
      type="button"
      variant="danger"
      class="button-hero"
    >
      <font-awesome-icon :icon="['fas', 'minus']" />  {{ $t('Delete') }}
    </b-button>
    <b-button
      v-if="add"
      @click="onCreateToken"
      type="button"
      variant="success"
      class="button-hero"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />  {{ $t('AddToken') }}
    </b-button>
    <!-- begin project not yet created -->
    <b-button
      v-if="project"
      @click="onCreateProject"
      type="button"
      variant="success"
      class="button-hero"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />  {{ $t('CreateProject') }}
    </b-button>
    <b-button
      v-if="token"
      @click="onEnterToken"
      type="button"
      variant="success"
      class="button-hero"
    >
      <font-awesome-icon :icon="['fas', 'minus']" />  {{ $t('EnterToken') }}
    </b-button>
    <!-- end project not yet created -->
    <b-button
      v-if="cancel"
      @click="onCancel"
      type="button"
      variant="success"
      class="button-hero"
    >
      <font-awesome-icon :icon="['fas', 'eject']" />  {{ $t('Cancel') }}
    </b-button>
    <b-modal v-model="showPopup" @ok="onDelete" title="Delete Project/Remove Link" ok-title="Delete">
      <span v-if="!own">
        {{ $t('LinkDelete') }}
      </span>
      <span v-else>
        {{ $t('Project wordt verwijderd') }}
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
    "Aanpassen": "Change",
    "AddToken": "Add Participant",
    "Cancel": "Cancel",
    "Create": "Create",
    "CreateProject": "Create your own project",
    "Delete": "Delete",
    "EnterToken": "Enter Token",
    "LinkDelete": "My connection to the project will be removed",
    "Project wordt verwijderd": "Project will be deleted",
    "Resetten": "Reset"
  },
"fr" :{
    "Aanpassen": "Modifier",
    "AddToken": "Add Participant",
    "Cancel": "Annuler",
    "Create": "Créer",
    "CreateProject": "Crée ton propre projet",
    "Delete": "Supprimer",
    "EnterToken": "Entre le jeton",
    "LinkDelete": "Ma connexion au projet sera supprimée",
    "Project wordt verwijderd": "Le projet est supprimé",
    "Resetten": "Restaurer"
  },
  "nl" :{
    "Aanpassen": "Aanpassen",
    "AddToken": "Deelnemer toevoegen",
    "Cancel": "Annuleren",
    "Create": "Toevoegen",
    "CreateProject": "Zelf een project starten",
    "Delete": "Verwijderen",
    "EnterToken": "Token gebruiken",
    "LinkDelete": "Mijn verbinding met het project zal verwijderd worden",
    "Project wordt verwijderd": "Project wordt verwijderd",
    "Resetten": "Resetten"
  }
}
</i18n>
