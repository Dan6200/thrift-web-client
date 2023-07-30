// Purpose: Joi schema for account data
// cspell:ignore alphanum
import joi from 'joi'
import { RegisterFormState } from './types'

export const schema = joi
  .object<RegisterFormState>()
  .keys({
    first_name: joi.string().alphanum().min(3).max(30).required(),
    last_name: joi.string().alphanum().min(3).max(30).required(),
    email: joi
      .string()
      .pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .allow(''),
    phone: joi
      .string()
      .pattern(
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
      )
      .allow(''),
    password: joi
      .string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
      ),
    dob: joi.date().required(),
    country: joi.string().required(),
  })
  .or('email', 'phone')
  .required()
