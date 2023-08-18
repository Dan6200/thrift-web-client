import axios, { AxiosError, AxiosResponse } from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { UseFormSetError } from 'react-hook-form'
import { LoginFormState, ResponseData } from './types'

export default async (
  setUser: any,
  setError: UseFormSetError<LoginFormState>,
  router: AppRouterInstance,
  data: LoginFormState
) => {
  const loginData = data
  if (data.email === '') {
    loginData.email = null
  } else if (data.phone === '') {
    loginData.phone = null
  }
  let response: AxiosResponse<ResponseData> | null = null
  try {
    if (process.env.NEXT_PUBLIC_SERVER)
      response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER + '/auth/login',
        loginData
      )
    if (response == null) {
      setError('root', {
        type: 'server',
        message:
          'An error occurred while trying to sign in. Please try again later',
      })
      return
    }
    const { data } = response
    if (data) {
      const { token } = data
      if (process.env.NEXT_PUBLIC_SERVER) {
        const user = await fetch(process.env.NEXT_PUBLIC_SERVER + '/account', {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json())
        if (token) setUser({ ...user, token })
      }
    }
    // re-route to home
    router.push('/')
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
