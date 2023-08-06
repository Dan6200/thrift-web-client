//cspell:ignore hookform
import { joiResolver } from '@hookform/resolvers/joi'
import { UseFormProps } from 'react-hook-form'
import { schema } from './schema'
import { RegisterFormState } from './types'

export default {
  resolver: async (data, context, options) => {
    // debug input schema
    return joiResolver(schema)(data, context, options)
  },
} as UseFormProps<RegisterFormState, any>