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
  let response: AxiosResponse<ResponseData> | null = null
  try {
    if (process.env.NEXT_PUBLIC_SERVER)
      response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER + '/v1/auth/register',
        userData
      )
    if (response == null) {
      setError('root', {
        type: 'server',
        message:
          'An error occurred while trying to create an account. Please try again later',
      })
      return
    }
    const { data } = response
    if (data) {
      const { token } = data
      if (process.env.NEXT_PUBLIC_SERVER) {
        const user = await fetch(
          process.env.NEXT_PUBLIC_SERVER + '/v1/account',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ).then((res) => res.json())
        if (token) setUser({ ...user, token })
      }
    }
    // re-route to previous page
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
            'An error occurred while trying to create an account. Please try again later',
        })
      }
    }
  }
}
