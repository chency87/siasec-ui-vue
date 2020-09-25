import request from '@/utils/request'

export function getsysPatameter() {
    return request({
        url: '/api/systemparameter',
        method: 'get'
       
    })
}
