import request from '@/utils/request'

export function networkabnormalcountinfo() {
  return request({
    url: '/api/trafficTrend/networkabnormalcountinfo',
    method: 'get'
    
  })
}
