import { api } from '..'

export const authController = props => {
  const baseRoute = 'auth'
  const description = 'เข้าสู่ระบบ'
  const config = {
    ...props,
    context: props?.context || null,
    router: props?.router || null,
    description
  }
  return {
    signIn: async params => {
      return await api.post(`${baseRoute}/sign-in`, params, config)
    }
  }
}
