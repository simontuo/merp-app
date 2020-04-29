import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/login',
        // url: '/user-services/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/users/info',
        method: 'get',
        params: { token }
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
        url: '/users/tenants',
        method: 'get',
        params: params
    })
}
