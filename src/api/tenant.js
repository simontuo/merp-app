import request from '@/utils/request'

export function tenantUserList(params) {
    return request({
        url: '/tenants/list',
        method: 'get',
        params: params
    })
}