//cspell:ignore hookform
import { joiResolver } from '@hookform/resolvers/joi'
import { UseFormProps } from 'react-hook-form'
import { schema } from './schema'
import { CardInfoFormType } from './types'

export default {
  resolver: async (data, context, options) => {
    // debug input schema
    // console.log(await joiResolver(schema)(data, context, options))
    return joiResolver(schema)(data, context, options)
  },
} as UseFormProps<CardInfoFormType, any>
