import request from "@/utils/request"

export function fetchList(query) {
    return request({
        url: 'suppliers',
        method: 'get',
        params: query
    })
}

export function profile(params) {
    return request({
        url: '/suppliers/' + params.id,
        method: 'get'
    })
}