import request from '@/utils/request'

export function getAuditLogs(lim) {
  return request({
    url: 'api/audit/logs',
    method: 'get',
    params: { limit: lim }
  })
}
export function getAuditLogsmore(start, last, lim) {
  return request({
    url: 'api/audit/logs',
    method: 'get',
    params: { startTime: start, endTime: last, limit: lim }
  })
}
export function getAuditLogsByEntityId(data, data1, lim) {
  return request({
    url: '/api/audit/logs/entity/' + data + '/' + data1,
    method: 'get',
    params: { limit: lim }
  })
}
