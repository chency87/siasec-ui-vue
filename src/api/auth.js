import request from '@/utils/request'

export function getUser() {
  return request({
    url: '/api/auth/user',
    method: 'get'

  })
}
export function changePassword(data) {
  return request({
    url: '/api/auth/changePassword',
    method: 'post',
    data
  })
}
