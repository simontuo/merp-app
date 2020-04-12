import request from "@/utils/request"

export function goodsPageList(query) {
    return request({
        url: '/goods',
        method: 'get',
        params: query
    })
}

export function goodsProfile(params) {
    return request({
        url: '/goods/' + params.id,
        method: 'get',
        params: params
    })
}

export function goodsStore(params) {
    return request({
        url: '/goods',
        method: 'post',
        params: params
    })
}

export function goodsUpdate(params) {
    return request({
        url: '/goods/' + params.id,
        method: 'put',
        params: params
    })
}

export function goodsBatchDelete(params) {
    return request({
        url: '/goods/delete',
        method: 'delete',
        params: params
    })
}