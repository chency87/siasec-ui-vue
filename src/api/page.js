import request from '@/utils/request'
export function getpage() {
  return request({
    url: '/api/acid/page',
    method: 'GET',
    params: { page: 2,size:5 }
  })
}


