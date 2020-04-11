import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/roles',
        method: 'get',
        params: params
    })
}

export function roleDelete(params) {
    return request({
        url: '/roles/delete',
        method: 'delete',
        params: params
    })
}

export function roleProfile(params) {
    return request({
        url: '/roles/' + params.id,
        method: 'get',
        params: params
    })
}

export function roleStore(params) {
    return request({
        url: '/roles',
        method: 'post',
        params: params
    })
}

export function roleUpdate(params) {
    return request({
        url: '/roles/' + params.id,
        method: 'put',
        params: params
    })
}

export function roleBind(params) {
    return request({
        url: '/roles/' + params.id + '/bind',
        method: 'put',
        params: params
    })
}

