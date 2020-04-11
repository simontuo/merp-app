import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/roles',
        method: 'get',
        params: params
    })
}

export function roleProfile(params) {
    return request({
        url: '/roles/' + params.id,
        method: 'get',
    })
}