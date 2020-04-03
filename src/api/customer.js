import request from "@/utils/request"

export function fetchList(query) {
    return request({
        url: '/customers',
        method: 'get',
        params: query
    })
}

export function profile(params) {
    return request({
        url: '/customers/' + params.id,
        method: 'get'
    })
}