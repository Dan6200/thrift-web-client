// Purpose: Joi schema for account data
import joi, { CustomHelpers } from 'joi'
import { RegisterFormState } from './types'

const customValidation = (value: any, helpers: CustomHelpers) => {
  console.log(value)
  if (!value.email && !value.phone) {
    return helpers.message({
      custom: 'Must provide either your Email or Phone number',
    })
  }
  return value
}

export const schema = joi
  .object<RegisterFormState>()
  .keys({
    first_name: joi
      .string()
      .trim()
      .pattern(/^[a-zA-Z]+$/)
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.pattern.base': 'Must only contain alphabetic characters',
        'string.empty': 'Must provide your first name',
        'string.min': 'Must be at least 3 characters',
        'string.max': 'Must be at most 30 characters',
        'any.required': '"First Name" is required',
      }),
    last_name: joi
      .string()
      .trim()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.pattern.base': 'Must only contain alphabetic characters',
        'string.empty': 'Must provide your last name',
        'string.min': 'Must be at least 3 characters',
        'string.max': 'Must be at most 30 characters',
        'any.required': '"Last Name" is required',
      }),
    email: joi
      .string()
      .trim()
      .pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .message('Please enter a valid email address')
      .allow(''),
    phone: joi
      .string()
      .pattern(
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
      )
      .message('Please enter a valid phone number')
      .allow(''),
    password: joi
      .string()
      .min(8)
      .message('Must be at least 8 characters')
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+\-~^:;`._=\/\\{}\[\]\(\)])[A-Za-z\d!@#$%^&*+\-~^_:;`.=\/\\{}\[\]\(\)]{8,}$/
      )
      .message(
        'Passwords must have at least one lowercase letter, one uppercase letter, a digit and one special character'
      )
      .required()
      .messages({ 'any.required': 'Must enter a password' }),
    confirm_password: joi
      .any()
      .valid(joi.ref('password'))
      .messages({ 'any.only': 'Passwords do not match!' }),
    dob: joi
      .date()
      .required()
      .messages({ 'any.required': 'Please provide your Date of birth' }),
  })
  .or('email', 'phone')
  .messages({
    'object.missing': 'Must provide either your Email or Phone number',
  })
  .required()
  .custom(customValidation)
// +:t)tGL%gde~2mb
