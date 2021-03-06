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
        url: '/dev/user-services/user/loginOut',
        method: 'post'
    })
}

export function userPageList(query) {
    return request({
        url: '/dev/user-services/user/usersPage',
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
        url: '/dev/user-services/user/newUser',
        method: 'post',
        params: params
    })
}

export function userProfile(params) {
    return request({
        url: '/dev/user-services/user/getUser/' + params.id,
        method: 'get',
        params: params
    })
}

export function userUpdate(params) {
    return request({
        url: '/dev/user-services/user/updateUser',
        method: 'put',
        params: params
    })
}

export function userBtachBan(data) {
    return request({
        url: '/dev/user-services/user/batchBan',
        method: 'put',
        data
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
        url: '/dev/user-services/user/getUserCompanys',
        method: 'get',
        params: params
    })
}

export function userRemoteList(params) {
    return request({
        url: '/users/remote_list',
        method: 'get',
        params: params
    })
}
