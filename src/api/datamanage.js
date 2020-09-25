import request from '@/utils/request'

export function getalldata(params) {
  return request({
    url: '/api/plugin/data/all',
    method: 'get',
    params
  })
}

export function postTransportParams(params) {
  return request({
    url: '/api/plugin/data/transport/exec',
    method: 'post',
    data: params
  })
}

export function stopTransport(params) {
  return request({
    url: '/api/plugin/data/transport/stop',
    method: 'post',
    data: params
  })
}
