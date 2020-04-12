import request from "@/utils/request"

export function cosItemPageList(query) {
    return request({
        url: '/cost_items',
        method: 'get',
        params: query
    })
}

export function costItemProfile(params) {
    return request({
        url: '/cost_items/' + params.id,
        method: 'get',
        params: params
    })
}

export function costItemUpdate(params) {
    return request({
        url: '/cost_items/' + params.id,
        method: 'put',
        params: params
    })
}

export function costItemStore(params) {
    return request({
        url: '/cost_items',
        method: 'post',
        params: params
    })
}

export function costItemBatchDelete(params) {
    return request({
        url: '/cost_items/delete',
        method: 'delete',
        params: params
    })
}