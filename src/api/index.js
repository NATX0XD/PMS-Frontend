// src/api/index.js
import axios from 'axios'
import isServer from '@/helpers/isServer'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { getAccessToken } from '@/context/authContext'
import { signOut } from 'next-auth/react'

const https = require('https')
const agent = new https.Agent({
  rejectUnauthorized: false
})

const axiosService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json'
  },
  httpsAgent: agent
})
axiosService.interceptors.request.use(async config => {
  const accessToken = !isServer() && (await getAccessToken())
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${String(accessToken)}`
  }
  if (config?.token) {
    config.headers['Authorization'] = `Bearer ${String(config.token)}`
  }
  return config
})
axiosService.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    const { response, config, code } = error
    // const { router } = config;
    if (code === 'ERR_NETWORK') {
      console.error('Network error, retrying in 10 seconds...')
      await new Promise(resolve => setTimeout(resolve, 10000))
      const data = JSON?.parse(config?.data || JSON.stringify({}))
      if (config.method === 'GET' || (data?.limit > 0 && data?.page > 0)) {
        return axiosService(config)
      } else {
        if (config?.context) {
          const { saveNotification } = config.context
          const notification = {
            id: uuidv4(),
            title: `บันทึกผิดพลาด เวลา ${dayjs().format('HH:mm')}`,
            description: `${config.description} \r\n ${config.data}`,
            data: JSON.stringify(config),
            route: 'ERR_NETWORK',
            type: 'error'
          }
          saveNotification(notification)
        }
      }
    }

    const isLogin = response.request.responseURL
      ? response.request.responseURL.split('/')
      : response.config?.url.split('/')

    const isUnauthorized =
      response?.status === 401 && isLogin[isLogin.length - 1] !== 'sign-in'

    if (isUnauthorized) {
      signOut({ callbackUrl: '/sign-in' })
      // if (config?.router) {
      //   console.log("router")
      // config.router.replace(`/sign-in`);
      // redirect("/sign-in");
      // } else if (!isServer()) {
      //   console.log("href")
      //   window.location.href = "/sign-in";
      // }
    }
    return Promise.reject(response.data)
  }
)
const service = () => {
  return {
    get: async (url, config) => {
      return await axiosService.get(url, config)
    },
    post: async (url, payload, config = null) => {
      return await axiosService.post(url, payload, config)
    },
    patch: async (url, payload, config = null) => {
      return await axiosService.patch(url, payload, config)
    },
    put: async (url, payload, config = null) => {
      return await axiosService.put(url, payload, config)
    },
    delete: async (url, config) => {
      return await axiosService.delete(url, config)
    }
  }
}
const api = service()
export { axiosService, api }
