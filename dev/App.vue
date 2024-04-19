<template>
  <h1>
    Vue Form Validator
  </h1>
  <form @submit="onSubmit" novalidate>
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
      />
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
      />
      <div v-if="postalCodeValidator.getInvalidMessage()" style="color: red;">
        {{ postalCodeValidator.getInvalidMessage() }}
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
  data() {
    return {
      username: '',
      postalCode: '',
    }
  },
  setup() {
    const usernameInputRef = ref(null)
    const postalCodeInputRef = ref(null)
    const usernameValidator = useValidator(usernameInputRef)
    const postalCodeValidator = useValidator(postalCodeInputRef)

    return {
      usernameInputRef,
      postalCodeInputRef,
      usernameValidator,
      postalCodeValidator,
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
