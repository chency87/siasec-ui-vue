import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}
// ${base.dev}/api/auth/login
export function getInfo(token) {
  return request({
    url: '/api/auth/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}
export function getCustomerUsers(id, lim) {
  return request({
    url: '/api/customer/' + id + '/users',
    method: 'get',
    params: { limit: lim }
  })
}
export function deleteUser(id) {
  return request({
    url: '/api/user/' + id,
    method: 'DELETE'
  })
}
export function setUserCredentialsEnabled(id) {
  return request({
    url: '/api/user/' + id + '/userCredentialsEnabled',
    method: 'post',
    params: { userCredentialsEnabled: 'false' }
  })
}
export function getActivationLink(id) {
  return request({
    url: '/api/user/' + id + '/activationLink',
    method: 'GET'

  })
}



