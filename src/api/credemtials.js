import request from '@/utils/request'


export function startorstop(data, data1, data2) {
  return request({
    url: '/api/' + data1 + '/' + data + '/plugin/exec',
    method: 'post',
    params: { status: data2, cron: '0/1 * * * * ?' }
  })
}
export function allplugin() {
  return request({
    url: '/api/proto/handle/plugin/all',
    method: 'get'

  })
}
export function showplugin(data, data1, data2) {
  return request({
    url: '/api/' + data + '/' + data1 + '/device/config',
    method: 'get',
    params: { pluginName: data2 }
  })
}
export function saveplugin(data1, data2, data3, data4) {
  return request({
    url: '/api/' + data1 + '/' + data2 + '/device/save',
    method: 'post',
    params: { protocol: data3 },
    data: data4
  })
}
