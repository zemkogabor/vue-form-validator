<template>
  <h1>
    Vue Form Validator
  </h1>
  <form novalidate @submit="onSubmit">
    <div>
      <label for="usernameInput">
        Input with custom validation ('admin' username invalid)
      </label>
      <input
        id="usernameInput"
        ref="usernameInputRef"
        v-model="username"
        :minlength="3"
        @invalid="usernameValidator.onInvalid"
      >
      <div v-if="usernameValidator.getInvalidMessage()" style="color: red;">
        {{ usernameValidator.getInvalidMessage() }}
      </div>
    </div>
    <div>
      <label for="postalCodeInput">
        Input with native (required) validation
      </label>
      <input
        id="postalCodeInput"
        ref="postalCodeInputRef"
        v-model="postalCode"
        type="text"
        required
        @invalid="postalCodeValidator.onInvalid"
      >
      <div v-if="postalCodeValidator.getInvalidMessage()" style="color: red;">
        {{ postalCodeValidator.getInvalidMessage() }}
      </div>
    </div>
    <div>
      <label for="inputMaxlengthInput">
        Input with minlength validation (3)
      </label>
      <input
        id="inputMaxlengthInput"
        type="text"
        minlength="3"
        @invalid="usernameValidator.onInvalid"
      >
      <div v-if="usernameValidator.getInvalidMessage()" style="color: red;">
        {{ usernameValidator.getInvalidMessage() }}
      </div>
    </div>
    <button type="submit">
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { useValidator } from '../src'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const usernameInputRef = ref(null)
    const postalCodeInputRef = ref(null)
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
    const usernameValidator = useValidator(usernameInputRef, messages)
    const postalCodeValidator = useValidator(postalCodeInputRef, messages)

    return {
      usernameInputRef,
      postalCodeInputRef,
      usernameValidator,
      postalCodeValidator,
    }
  },
  data() {
    return {
      username: '',
      postalCode: '',
    }
  },
  methods: {
    onSubmit(event : Event): void {
      event.preventDefault()

      if (this.username === 'admin') {
        this.usernameValidator.setCustomError('Username is already taken')
      } else {
        this.usernameValidator.setCustomError(null)
      }

      const target = event.target as HTMLFormElement
      if (!target.checkValidity()) {
        console.log('validation failed')
        return
      }

      console.log('submit success')
    },
  },
})
</script>
