import Cookie from 'js-cookie'

export default {
  authHeader(to: any, from: any, next: any) {
    const token = Cookie.get('_tcc2_token')
    if (!token) return next('/')
    return token
  },
  get_token() : string|undefined {
    const token = Cookie.get('_tcc2_token')
    return token
  }

}