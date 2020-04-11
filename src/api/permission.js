import request from "@/utils/request"

export function fetchList(params) {
    return request({
        url: '/permissions',
        method: 'get',
        params: params
    })
} 