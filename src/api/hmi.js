import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getDeviceCredentialsByDeviceId(data) {
  return request({
    url: '/api/device/' + data + '/credentials',
    method: 'get'
  })
}
export function postDeviceCredentialsByDeviceId(params) {
  return request({
    url: '/api/device/credentials',
    method: 'post',
    params
  })
}
export function transformDeviceStatus(entityType, entityId, params) {
  return request({
    url: '/api/' + entityType + '/' + entityId + '/plugin/exec',
    method: 'post',
    params
  })
}

export function initWebSocket() {
  // 初始化weosocket
  const wsuri = 'ws://' + window.location.host + process.env.VUE_APP_BASE_API + '/api/ws/plugins/telemetry?token=' + getToken()
  return new WebSocket(wsuri)
}
// startTime, endTime, ascOrder, offset, limit

export function getAuditLogsByEntityId(entityType, entityId, params) {
  return request({
    url: '/api/audit/logs/entity/' + entityType + '/' + entityId,
    method: 'get',
    params
    // params: {
    //   startTime: startTime,
    //   endTime: endTime,
    //   ascOrder: ascOrder,
    //   offset: offset,
    //   limit: limit
    // }  /api/device/f5c6ba60-ed80-11ea-a65a-abaad175ea74/status
  })
}
export function getDeviceShortStatus(deviceId) {
  return request({
    url: '/api/device/' + deviceId + '/status',
    method: 'get'
  })
}

export function postDeviceShortStatus(deviceId, params) {
  return request({
    url: '/api/plugins/telemetry/' + deviceId + '/IDENTITY_SCOPE',
    method: 'post',
    data: params
  })
}

export function getDeviceTransportCondition(deviceId) {
  return request({
    url: '/api/device/getTransportCondition/' + deviceId,
    method: 'get'
  })
}
export function postDeviceTransportCondition(deviceId, params) {
  return request({
    url: '/api/device/editTransportCondition/' + deviceId,
    method: 'post',
    data: params
  })
}

