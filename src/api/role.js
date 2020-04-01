import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/roles',
        method: 'get',
        query: query
    })
}