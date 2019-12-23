import { extend } from 'vee-validate'
import { required, digits, regex, email, alpha_spaces as AlphaSpaces, oneOf, required_if as requiredIf, max, min } from 'vee-validate/dist/rules'
import isWithinRange from 'date-fns/is_within_range'
// import addYears from 'date-fns/add_years'
import addDays from 'date-fns/add_days'
// install the 'required' rule.
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
  validate (value, { min, max, month, year }) {
    const birthMonth = new Date(((year === undefined) ? value : year), ((month === undefined) ? value : month), 1)
    return isWithinRange(birthMonth, addDays(min, -1), addDays(max, 1))
  }
})

extend('all_true', {
  params: ['values'],
  validate (value, { values }) {
    return true // (value + '') === (Array.isArray(values) ? values.map((item) => { return item.value }).join() : values.value)
  }
})
