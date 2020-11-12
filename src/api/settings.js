import request from '@/utils/request'

export function saveConfigTransport(data) {
  return request({
    url: '/api/setting',
    method: 'post',
    data
  })
}
export function getConfigTransport() {
  return request({
    url: '/api/setting',
    method: 'get'
  })
}
