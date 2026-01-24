import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { VALIDATOR_CONFIG_KEY, type ValidatorConfig, type ValidatorMessages } from './validatorConfig'

export function useValidator(inputRef : Ref<HTMLInputElement | null>): {
  onInvalid: (event: Event) => void;
  getInvalidMessage: () => string | null;
  setCustomError: (data: string) => void;
} {
  const injected = inject<ValidatorConfig | undefined>(
    VALIDATOR_CONFIG_KEY,
    undefined,
  )

  if (!injected || !injected.messages) {
    throw new Error(
      '[vue-form-validator] Validator messages are not provided. ' +
      'Did you forget to call app.provide(VALIDATOR_CONFIG_KEY, ...)?',
    )
  }

  const messages: ValidatorMessages = injected.messages

  const invalidMessage: Ref<string | null> = ref(null)

  /**
   * Set custom error
   *
   * @param data
   */
  function setCustomError(data : string): void {
    const validationTarget = inputRef.value

    if (validationTarget === null) {
      return
    }

    if (data !== null) {
      validationTarget.setCustomValidity(data)
    } else {
      validationTarget.setCustomValidity('')
    }

    invalidMessage.value = calcInvalidMessage(validationTarget)
  }

  /**
   * Return invalid message.
   *
   * @param input
   * @returns {string|null}
   */
  function calcInvalidMessage(input : HTMLInputElement): string|null {
    if (input.validity.valueMissing) {
      return messages.valueMissing
    }

    if (input.validity.tooShort) {
      return messages.tooShort(input.minLength)
    }

    if (input.validity.tooLong) {
      return messages.tooLong(input.maxLength)
    }

    if (input.validity.rangeUnderflow) {
      return messages.rangeUnderflow(input.min)
    }

    if (input.validity.rangeOverflow) {
      return messages.rangeOverflow(input.max)
    }

    if (input.validity.typeMismatch) {
      if (input.type === 'email') {
        return messages.typeMismatchEmail
      }

      if (input.type === 'url') {
        return messages.typeMismatchUrl
      }
    }

    if (input.validity.badInput) {
      if (input.type === 'number') {
        return messages.badInputNumber
      }
      if (input.type === 'date') {
        return messages.badInputDate
      }
    }

    if (input.validity.patternMismatch) {
      return messages.patternMismatch
    }

    if (input.validity.stepMismatch) {
      const nearestMin = Math.floor(Number(input.value) / Number(input.step)) * Number(input.step)
      const nearestMax = Math.ceil(Number(input.value) / Number(input.step)) * Number(input.step)

      return messages.stepMismatch(nearestMin, nearestMax)
    }

    if (input.validity.customError) {
      return input.validationMessage
    }

    return null
  }

  /**
   * On invalid event.
   *
   * @param event
   */
  function onInvalid(event : Event): void {
    if (event.target === null) {
      return
    }

    invalidMessage.value = calcInvalidMessage(event.target as HTMLInputElement)
  }

  /**
   * Return invalid message, null if valid.
   */
  function getInvalidMessage(): string|null {
    return invalidMessage.value
  }

  return {
    onInvalid,
    getInvalidMessage,
    setCustomError,
  }
}
