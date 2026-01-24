import { createApp } from 'vue'
import App from './App.vue'
import { VALIDATOR_CONFIG_KEY } from '../src/validatorConfig'

const app = createApp(App)

const messages = {
  valueMissing: 'This field is required',
  tooShort: (minLength: number) => `Please enter at least ${minLength} characters`,
  tooLong: (maxLength: number) => `Please enter no more than ${maxLength} characters`,
  rangeUnderflow: (min: string) => `Value must be at least ${min}`,
  rangeOverflow: (max: string) => `Value must be at most ${max}`,
  typeMismatchEmail: 'Please enter a valid email address',
  typeMismatchUrl: 'Please enter a valid URL',
  badInputNumber: 'Please enter a valid number',
  badInputDate: 'Please enter a valid date',
  patternMismatch: 'Please match the requested format',
  stepMismatch: (nearestMin: number, nearestMax: number) => `Please enter a valid value. Nearest valid values are ${nearestMin} and ${nearestMax}`,
}

app.provide(VALIDATOR_CONFIG_KEY, {
  messages,
})

app.mount('#app')
