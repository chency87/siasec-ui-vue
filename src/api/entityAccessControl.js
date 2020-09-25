import request from '@/utils/request'

export function getAccessPolicyByEntityId(params) {
  return request({
    url: '/api/access/policy',
    method: 'get',
    params
  })
}

export function saveAccessPolicyByEntityId(params) {
  return request({
    url: '/api/access/policy',
    method: 'post',
    params
  })
}

export function deleteAccessPolicyByEntityId(params) {
  return request({
    url: '/api/access/policy',
    method: 'delete',
    params
  })
}
