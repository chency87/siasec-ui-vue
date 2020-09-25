import request from '@/utils/request'


export function getAlertInformation() {
    return request({
        url: 'api/ids/alertinformation',
        method: 'get',

    })
}
export function getSensors() {
    return request({
        url: 'api/ids/sensors',
        method: 'get',

    })
}
export function getTopSources() {
    return request({
        url: 'api/ids/topsources',
        method: 'get',

    })
}
export function getTopTargets() {
    return request({
        url: 'api/ids/toptargets',
        method: 'get',

    })
}
export function getTopTargetPort() {
    return request({
        url: 'api/ids/toptargetports',
        method: 'get',

    })
}
export function getSignatures(l1, l2) {
    return request({
        url: 'api/ids/signatures',
        method: 'get',
        params: { size: l2, page: l1 }
    })
}
export function getAcidevent(l1, l2) {
    return request({
        url: 'api/acid/byPage',
        method: 'get',
        params: { page: l1, size: l2 }

    })
}
export function gettraffic(l1, l2) {
    return request({
        url: '/api/trafficTrend/networktraffictend',
        method: 'get',
        params: { start: l1, end: l2 }

    })
}
export function gettrafficdata() {
    return request({
        url: '/api/trafficTrend/networkabnormalcountinfo',
        method: 'get',
        

    })
}