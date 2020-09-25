import request from '@/utils/request'

export function getAllProtoPluginDetail() {
  return request({
    url: '/api/proto/handle/plugin/all',
    method: 'GET'
  })
}
export function getAllProtoPluginName() {
  return request({
    url: '/api/proto/handle/plugin/get',
    method: 'GET'
  })
}
export function deleteProtoPluginByName(data) {
  return request({
    url: '/api/proto/handle/plugin/del?name=',
    method: 'DELETE',
    data
  })
}
export function uploadProtoPlugin(data) {
  return request({
    url: '/api/proto/handle/plugin/upload',
    method: 'POST',
    data
  })
}

export function getDeviceProtocolConfig(entityType, entityId, protocol) {
  return request({
    url: '/api/' + entityType + '/' + entityId + '/device/config?protocol=' + protocol,
    method: 'GET'
  })
}
