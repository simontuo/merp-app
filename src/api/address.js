import request from "@/utils/request"

export function addressProfile(params) {
    return request({
        url: '/customer_addresses/' + params.id,
        method: 'get',
        params: params
    })
}

export function addressStore(params) {
    return request({
        url: '/customer_addresses',
        method: 'post',
        params: params
    })
}

export function addressPageList(params) {
    return request({
        url: '/customer_addresses',
        method: 'get',
        params: params
    })
}

export function addressBatchDelete(params) {
    return request({
        url: '/customer_addresses/delete',
        method: 'delete',
        params: params
    })
}

export function addressUpdate(params) {
    return request({
        url: '/customer_addresses/' + params.id,
        method: 'put',
        params: params
    })
}