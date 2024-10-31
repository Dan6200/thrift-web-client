import { createUserWithEmailAndPasswordWrapper } from '@/app/auth/firebase'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { UseFormSetError } from 'react-hook-form'
import { RegisterFormState, ResponseData } from './types'

export default async function submitHandler(
  setUser: any,
  setError: UseFormSetError<RegisterFormState>,
  router: AppRouterInstance,
  data: RegisterFormState
) {
  const formData = data
  const { confirm_password, ...userData } = formData
  if (formData.email === '') {
    userData.email = null
  } else if (formData.phone === '') {
    userData.phone = null
  }
  let response = null
  try {
    response = await createUserWithEmailAndPasswordWrapper(
      userData.email!,
      userData.password
    )
    if (response == null) {
      setError('root', {
        type: 'server',
        message:
          'An error occurred while trying to create an account. Please try again later',
      })
      return
    }
    console.log(response)
    const { result: user } = response
    const { confirm_password, password, ...dbData } = data
    if (typeof user !== 'string') {
      const token = await user.getIdToken()
      console.log(token)
      if (process.env.NEXT_PUBLIC_SERVER) {
        await axios
          .post(process.env.NEXT_PUBLIC_SERVER + '/v1/users', dbData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.data)
            const { uid } = res.data
            if (uid) setUser({ ...user, token })
          })
          .catch((e) => {
            console.error('Unable to save user data: ' + e)
            console.log(e)
          })
      }
    }
    // re-route to previous page
    //router.push('/')
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      if (err.response && err.response.status >= 400) {
        setError('root', {
          type: 'server',
          message: err.response.data?.message as string,
        })
      } else {
        setError('root', {
          type: 'server',
          message:
            'An error occurred while trying to create an account. Please try again later',
        })
      }
    }
  }
}
