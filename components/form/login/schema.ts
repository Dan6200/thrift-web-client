import joi, { CustomHelpers } from 'joi'
import { LoginFormState } from './types'

const customValidation = (value: any, helpers: CustomHelpers) => {
  if (!value.email && !value.phone) {
    return helpers.message({
      custom: 'Must provide either your Email or Phone number',
    })
  }
  return value
}

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
  .messages({
    'object.missing': 'Must provide either your Email or Phone number',
  })
  .required()
  .custom(customValidation)
