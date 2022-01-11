import { localize } from 'vee-validate'

export default function ({ app }) {
  app.i18n.onLanguageSwitched = (_, newLocale) => {
    localize(newLocale)
  }
}
