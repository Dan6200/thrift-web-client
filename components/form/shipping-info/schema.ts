// Purpose: Joi schema for account data
import joi from 'joi'
import { ShippingInfoFormType } from './types'

export const schema = joi
  .object<ShippingInfoFormType>({
    recipient_first_name: joi
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
    recipient_last_name: joi
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
    city: joi.string(),
    state: joi.string(),
    delivery_contact: joi
      .string()
      .pattern(
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
      )
      .message('Please enter a valid phone number')
      .allow(''),
  })
  .or('email', 'phone')
  .messages({
    'object.missing': 'Must provide either your Email or Phone number',
  })
  .required()
