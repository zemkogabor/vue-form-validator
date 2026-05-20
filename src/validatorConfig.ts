import type { InjectionKey } from 'vue'

export type ValidatorMessages = {
  valueMissing: string;
  tooShort(minLength: number): string;
  tooLong(maxLength: number): string;
  rangeUnderflow(min: string): string;
  rangeOverflow(max: string): string;
  typeMismatchEmail: string;
  typeMismatchUrl: string;
  badInputNumber: string;
  badInputDate: string;
  patternMismatch: string;
  stepMismatch(nearestMin: number, nearestMax: number): string;
}

export type CustomValidatorMessages = {
  valueMissing?: string;
  tooShort?(minLength: number): string;
  tooLong?(maxLength: number): string;
  rangeUnderflow?(min: string): string;
  rangeOverflow?(max: string): string;
  typeMismatchEmail?: string;
  typeMismatchUrl?: string;
  badInputNumber?: string;
  badInputDate?: string;
  patternMismatch?: string;
  stepMismatch?(nearestMin: number, nearestMax: number): string;
}

export interface ValidatorConfig {
  messages: ValidatorMessages;
}

export const VALIDATOR_CONFIG_KEY: InjectionKey<ValidatorConfig> = Symbol('VALIDATOR_CONFIG')
