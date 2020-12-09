import { extend, localize } from 'vee-validate'

import en from 'vee-validate/dist/locale/en.json'
import nl from 'vee-validate/dist/locale/nl.json'
import fr from 'vee-validate/dist/locale/fr.json'

import { required, digits, regex, email, alpha_spaces as AlphaSpaces, oneOf, required_if as requiredIf, max, min } from 'vee-validate/dist/rules'
import { isWithinInterval, addDays } from 'date-fns'
// install the 'required' rule.

localize({
  en,
  nl,
  fr
})

extend('required', {
  ...required
})

extend('digits', {
  ...digits
})

extend('regex', {
  ...regex
})

extend('email', {
  ...email
})

extend('alpha_spaces', {
  ...AlphaSpaces
})

extend('oneOf', {
  ...oneOf
})

extend('required_if', {
  ...requiredIf
})

extend('max', {
  ...max
})

extend('min', {
  ...min
})

extend('between_dates', {
  params: ['min', 'max', 'month', 'year'],
  validate(value, { min, max, month, year }) {
    const birthMonth = new Date(((year === undefined) ? value : year), ((month === undefined) ? value : month), 1)
    return isWithinInterval(birthMonth, { start: addDays(min, -1), end: addDays(max, 1) })
  }
})

extend('all_true', {
  params: ['values'],
  validate(value, { values }) {
    return true
  }
})
