import request from "@/utils/request"



export function customerProfile(params) {
    return request({
        url: '/customers/' + params.id,
        method: 'get',
        params: params
    })
}

export function customerUpdate(params) {
    return request({
        url: '/customers/' + params.id,
        method: 'put',
        params: params
    })
}

export function customerStore(params) {
    return request({
        url: '/customers',
        method: 'post',
        params: params
    })
}

export function customerBan(params) {
    return request({
        url: '/customers/ban',
        method: 'put',
        params: params
    })
}

export function customerPageList(params) {
    return request({
        url: '/customers',
        method: 'get',
        params: params
    })
}