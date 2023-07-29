import joi from 'joi'
import { LoginFormState } from './types'

export const formSchema = joi.object<LoginFormState>({
  email: joi
    .string()
    .email()
    .pattern(
      /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
    ),
  phone: joi
    .string()
    .pattern(
      /^s*(?:+?(d{1,3}))?[-. (]*(d{3})[-. )]*(d{3})[-. ]*(d{4})(?: *x(d+))?s*$/
    ),
  password: joi.string().pattern(/w/),
})
