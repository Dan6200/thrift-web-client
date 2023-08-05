import joi from 'joi'
import { LoginFormState } from './types'

export const schema = joi
  .object<LoginFormState>()
  .keys({
    email: joi.string().allow(''),
    phone: joi.string().allow(''),
    password: joi
      .string()
      .required()
      .messages({ 'any.required': 'Please enter your password' }),
  })
  .or('email', 'phone')
  .required()
  .messages({
    'object.missing': 'Must provide either your Email or Phone number',
  })
