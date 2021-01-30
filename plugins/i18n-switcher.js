import { localize } from 'vee-validate'

export default function ({ app }) {
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    localize(newLocale)
  }
}
