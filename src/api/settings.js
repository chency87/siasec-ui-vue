import request from '@/utils/request'

export function saveConfigTransport(data) {
  return request({
    url: '/api/config/transport/save',
    method: 'post',
    data
  })
}
export function getConfigTransport() {
  return request({
    url: '/api/config/transport/get',
    method: 'get'
  })
}
