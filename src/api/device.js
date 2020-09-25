import request from '@/utils/request'

export function getdeviceInfo() {
    return request({
        url: 'api/tenant/devices',
        method: 'get',
        params: { limit: '11' }
    })
}
export function getDeviceTypes() {
    return request({
        url: 'api/device/types',
        method: 'get',
        
    })
}
export function getDeviceById(data) {
    return request({
        url: 'api/device/'+ data,
        method: 'get',
        
    })
}
export function addeviceInfo(data) {
    return request({
        url: '/api/device',
        method: 'POST',
        data
    })
}

export function deleteDevice(data) {
    return request({
        url: '/api/device/'+data,
        method: 'DELETE'
    })
}
export function execall() {
    return request({
        url: '/api/exec/all',
        method: 'POST'
    })
}
export function stopall(data) {
    return request({
        url: '/api/stop/all',
        method: 'POST',
        data
    })
}
export function getDevicesByIds(data) {
    return request({
        url: '/api/devices',
        method: 'get',
        params:{deviceIds:data}
    })
}