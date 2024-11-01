import { signInWithEmailAndPasswordWrapper } from '@/app/auth/firebase'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { UseFormSetError } from 'react-hook-form'
import { LoginFormState, ResponseData } from './types'

export default async function submitHandler(
  setUser: any,
  setError: UseFormSetError<LoginFormState>,
  router: AppRouterInstance,
  data: LoginFormState
) {
  const loginData = data
  if (data.email === '') {
    loginData.email = null
  } else if (data.phone === '') {
    loginData.phone = null
  }
  let response = null
  try {
    const { email, password } = loginData

    if (email)
      response = await signInWithEmailAndPasswordWrapper(email, password)
    if (response == null) {
      setError('root', {
        type: 'server',
        message:
          'An error occurred while trying to sign in. Please try again later',
      })
      return
    }
    const { result: user } = response
    if (user) {
      let token: string | null = null
      if (typeof user !== 'string') token = await user.getIdToken()
      console.log('token: ', token)
      if (process.env.NEXT_PUBLIC_SERVER) {
        await axios(process.env.NEXT_PUBLIC_SERVER + '/v1/users', {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          const { data: user } = res
          if (user) setUser({ ...user, token })
        })
        // re-route to previous page
        router.push('/')
      }
    }
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
            'An error occurred while trying to login. Please try again later',
        })
      }
    }
  }
}
