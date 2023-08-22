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
        'any.required': '"Recipient\'s First Name" is required',
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
        'any.required': '"Recipient\'s Last Name" is required',
      }),
    address: joi
      .string()
      .required()
      .messages({ 'any.required': 'Please Enter Your Home Address.' }),
    city: joi.string().required().messages({
      'any.required': 'Please Enter The Name Of Your City Or Town.',
    }),
    state: joi.string().required().messages({
      'any.required': 'Please Select Your State.',
    }),
    delivery_contact: joi
      .string()
      .pattern(
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
      )
      .message('Please Enter A Valid Phone Number')
      .required()
      .messages({
        'any.required': 'Please Enter A Contact We Can Call When Delivering.',
      }),
    delivery_instructions: joi.string(),
  })
  .required()
