import { UserAccount } from '@/components/user-account/types'
import axios, { AxiosError } from 'axios'

export const logout = (user: UserAccount, setUser: any) => {
  async function _logout() {
    if (process.env.NEXT_PUBLIC_SERVER != null) {
      try {
        await axios.delete(process.env.NEXT_PUBLIC_SERVER + '/auth/logout', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        await setUser(null)
      } catch (err) {
        if (err) {
          if (err instanceof AxiosError) console.error(err?.response?.data)
          throw new Error('Could not logout user')
        }
      }
    } else throw new Error('Could not logout user')
  }
  _logout()
}
