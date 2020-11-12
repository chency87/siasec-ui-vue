import request from '@/utils/request'

// /api/audit/logs{?startTime,endTime,ascOrder,offset,actionTypes,limit}
export function getAuditLogs(startTime, endTime, ascOrder, offset, actionTypes, limit) {
  return request({
    url: 'api/audit/logs',
    method: 'get',
    // params: { limit: limit }
    params: {
      startTime: startTime,
      endTime: endTime,
      ascOrder: ascOrder,
      offset: offset,
      actionTypes: actionTypes,
      limit: limit
    }
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
