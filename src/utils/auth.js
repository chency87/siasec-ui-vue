import Cookies from 'js-cookie'

const TokenKey = 'jwt_token'
const RefreshTokenKey = 'refresh_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token.token)
  return Cookies.set(RefreshTokenKey, token.refreshToken)
}

export function removeToken() {
  Cookies.remove(RefreshTokenKey)
  return Cookies.remove(TokenKey)
}
