// Purpose: Joi schema for account data
import joi from 'joi'
import { CardInfoFormType } from './types'

export const schema = joi
  .object<CardInfoFormType>({
    name: joi.string().trim().min(3).max(50).required().messages({
      'string.min': 'Must be at least 3 characters',
      'string.max': 'Must be at most 30 characters',
      'any.required': 'Please Enter The Name On Your Credit Card.',
    }),
    card_number: joi
      .string()
      .pattern(/^(\d{4}\s){3}\d{1,4}$/)
      .message('Please Enter A Valid Card Number')
      .required()
      .messages({
        'any.required': 'Please Enter Your Card Number.',
      }),
    exp_date: joi
      .string()
      .pattern(/^\d{2}\/\d{2}$/)
      .message('Please Enter A Valid Date Format &ndash; mm/yy')
      .required()
      .messages({
        'any.required': 'Please Enter The Expiry Date On Your Card.',
      }),
    security_code: joi
      .string()
      .pattern(/^\d{3,4}$/)
      .message('Please Enter A Valid CVV Number')
      .required()
      .messages({
        'any.required':
          'Please Enter The CVV Number Found At The Back Of Your Card',
      }),
  })
  .required()
