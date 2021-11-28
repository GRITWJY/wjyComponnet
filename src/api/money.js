import request from '../core/request'
export function Function(params){
    return request({
        url:'//',
        method:'POST',
        data:params
    })
}