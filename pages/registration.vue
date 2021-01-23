<template>
  <b-row>
    <b-col>
      <h1>{{ $t("titleReg") }}</h1>
      <global-notification />
      <h2>{{ $t("personal_info") }}</h2>
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form @submit.prevent="passes(onSubmit)" @reset.prevent="onReset">
          <user
            ref="user"
            v-model="user"
            :field-status="user_field_status"
          />
          <h1>{{ $t("Project") }}</h1>
          <b-form-group>
            <b-form-radio v-model="is_own_project" name="own_project" value="own">
              {{ $t("eigenProject") }}
            </b-form-radio>
            <b-form-radio v-model="is_own_project" name="own_project" value="other">
              {{ $t("medeProject") }}
            </b-form-radio>
          </b-form-group>
          <div v-if="is_own_project === 'own'">
            <own-project
              ref="ownProject"
              v-model="own_project"
              :field-status="own_project_field_status"
            />
          </div>
          <div v-else>
            <other-project
              ref="otherProject"
              v-model="other_project"
              :field-status="other_project_field_status"
            />
          </div>
          <mandatory-questions ref="mandatoryQuestions" v-model="mandatory_approvals" />
          <b-form-group>
            <b-button
              :disabled="loading"
              type="submit"
              variant="info"
              class="button-hero"
            >
              <span
                v-if="loading"
              ><b-spinner type="grow" /> {{ $t("pleaseWait") }}</span>
              <span
                v-else
              ><font-awesome-icon
                 v-if="!loading"
                 :icon="['fas', 'paper-plane']"
               />
                {{ $t("Ik schrijf me in") }}</span>
            </b-button>
            <b-button
              :disabled="loading"
              type="reset"
              variant="warning"
              class="button-hero"
            >
              <font-awesome-icon :icon="['fas', 'trash-restore']" />
              {{ $t("verwijder alles") }}
            </b-button>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-col>
  </b-row>
</template>
<script>
import { ValidationObserver } from 'vee-validate'

export default {
  middleware: 'notAuthenticated',
  components: {
    ValidationObserver
  },
  async asyncData ({ store, app, redirect }) {
    const settings = await app.$services.settings.get()
    if (!settings) {
      app.router.push(app.localePath('no_event'))
    }
  },
  data () {
    return {
      loading: false,
      is_own_project: 'own',
      readWrite: true
    }
  },
  computed: {
    other_project_field_status () {
      return {
        project_code: {
          rw: this.readWrite
        }
      }
    },
    own_project_field_status () {
      return {
        project_name: {
          rw: this.readWrite
        },
        project_descr: {
          rw: this.readWrite
        },
        project_type: {
          rw: this.readWrite
        },
        project_lang: {
          rw: this.readWrite
        }
      }
    },
    user_field_status () {
      return {
        year: {
          rw: this.readWrite
        },
        month: {
          rw: this.readWrite
        },
        email: {
          rw: this.readWrite
        },
        firstname: {
          rw: this.readWrite
        },
        lastname: {
          rw: this.readWrite
        },
        sex: {
          rw: this.readWrite
        },
        address: {
          postalcode: {
            rw: this.readWrite
          },
          street: {
            rw: this.readWrite
          },
          house_number: {
            rw: this.readWrite
          },
          bus_number: {
            rw: this.readWrite
          },
          municipality_name: {
            rw: this.readWrite
          }
        },
        gsm: {
          rw: this.readWrite
        },
        via: {
          rw: this.readWrite
        },
        medical: {
          rw: this.readWrite
        },
        email_guardian: {
          rw: this.readWrite
        },
        gsm_guardian: {
          rw: this.readWrite
        },
        t_size: {
          rw: this.readWrite
        },
        general_questions: {
          rw: this.readWrite
        }
      }
    },
    own_project: {
      async set (value) {
        await this.$store.dispatch('registration/own_project', Object.assign({}, value))
      },
      get () {
        return this.$store.state.registration.own_project
      }
    },
    other_project: {
      async set (value) {
        await this.$store.dispatch('registration/other_project', Object.assign({}, value))
      },
      get () {
        return this.$store.state.registration.other_project
      }
    },
    user: {
      async set (value) {
        const u = value
        u.language = this.$i18n.locale
        await this.$store.dispatch('registration/user', Object.assign({}, u))
      },
      get () {
        return this.$store.state.registration.user
      }
    },
    mandatory_approvals: {
      async set (value) {
        const u = this.$store.state.registration.user
        u.mandatory_approvals = value
        await this.$store.dispatch('registration/user', Object.assign({}, u))
      },
      get () {
        const u = this.$store.state.registration.user
        return u.mandatory_approvals
      }
    }
  },
    mounted () {
    this.$nextTick(async () => {
      // redirect to user page (token in GET string)
      const token = this.$route.query.token
      if (token) {
        this.is_own_project =  'other'
        this.other_project.project_code = token
      }
    })
  },
  methods: {
    async onSubmit (evt) {
      this.loading = true

      const registration = { project: {} }
      if (this.is_own_project === 'own') {
        registration.project.own_project = this.own_project
      } else {
        registration.project.other_project = this.other_project
      }
      registration.user = this.user
      await this.$services.registration.post(registration)
      await this.onReset(evt)

      this.loading = false
      window.scrollTo(0, 0)
    },
    onReset (evt) {
      this.$refs.mandatoryQuestions.reset()
      this.$refs.user.reset()
      if (this.$refs.otherProject) {
        this.$refs.otherProject.reset()
      }
      if (this.$refs.ownProject) {
        this.$refs.ownProject.reset()
      }
      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
<style></style>
