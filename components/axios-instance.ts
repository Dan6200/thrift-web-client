import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SEARCH,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SEARCH_KEY}`,
    'Content-Type': 'application/json',
  },
})
