import request from '@/utils/request'

export function departmentList(params) {
    return request({
        url: '/departments',
        method: 'get',
        params: params
    })
}

export function departmentStore(params) {
    return request({
        url: '/departments',
        method: 'post',
        params: params
    })
}
