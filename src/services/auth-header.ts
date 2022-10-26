import Cookie from 'js-cookie'

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authHeader(to: any, from: any, next: any) {
    const token = Cookie.get('_tcc2_token')
    if (!token) return next('/')
    return next()
  },
  get_token() : string|undefined {
    const token = Cookie.get('_tcc2_token')
    return token
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authCategory(to: any, from: any, next: any) {
    if (!to.query.categoria) return next('/')
    return next()
  },
}