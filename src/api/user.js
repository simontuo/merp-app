import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/dev/user-services/user/login',
        method: 'post',
        data
    })
}

export function getInfo(params) {
    return request({
        url: '/dev/user-services/user/getUser/' + params.id,
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export function userPageList(query) {
    return request({
        url: '/users',
        method: 'get',
        params: query
    })
}

export function userList(query) {
    return request({
        url: '/users/list',
        method: 'get',
        params: query
    })
}

export function userStore(params) {
    return request({
        url: '/users',
        method: 'post',
        params: params
    })
}

export function userProfile(params) {
    return request({
        url: '/users/' + params.id,
        method: 'get',
        params: params
    })
}

export function userUpdate(params) {
    return request({
        url: '/users/' + params.id,
        method: 'put',
        params: params
    })
}

export function userBan(params) {
    return request({
        url: '/users/ban',
        method: 'put',
        params: params
    })
}

export function userResetPassword(params) {
    return request({
        url: '/users/reset_password',
        method: 'post',
        params: params
    })
}

export function userTenantList(params) {
    return request({
        url: '/dev/user-services/company/getUserCompanys',
        method: 'get',
        params: params
    })
}
