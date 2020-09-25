import request from '@/utils/request'
export function getCustomers(lim) {
    return request({
        url: 'api/customers',
        method: 'get',
        params: { limit: lim }
    })
    
}
export function deleteCustomers(id) {
    return request({
        url: 'api/customer/'+id,
        method: 'DELETE',
       
    })
}
export function saveCustomer(data) {
        return request({
            url: 'api/customer/',
            method: 'post',
             data 
        })
        
}

        
export function getTenantCustomer(customerTitle) {
            return request({
                url: 'api/tenant/customers',
                method: 'GET',
                params: { customerTitle: customerTitle }  
            })
            
    }
    
    export function getCustomerDevices(id,lim) {
        return request({
            url: 'api/customer/'+id+"/devices",
            method: 'GET',
            params: { limit: lim }  
        })
        
}
     