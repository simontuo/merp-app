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

export function customerBatchBan(params) {
    return request({
        url: '/customers/batch_ban',
        method: 'put',
        params
    })
}

export function customerPageList(params) {
    return request({
        url: '/customers',
        method: 'get',
        params: params
    })
}

export function customerRemote(params) {
    return request({
        url: '/customers/remote',
        method: 'get',
        params: params
    })
}