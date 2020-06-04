import request from '@/utils/request'

export function tenantUserList(params) {
    return request({
        url: '/tenants/list',
        method: 'get',
        params: params
    })
}

export function tenantSet(params) {
    return request({
        url: '/dev/user-services/user/selectUserCompany',
        // url: '/dev/user-services/company/selectUserCompany',
        method: 'get',
        params: params
    })
}