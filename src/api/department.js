import request from '@/utils/request'

export function departmentProfile(params) {
    return request({
        url: '/dev/user-services/department/getDepartment/' + params.id,
        method: 'get',
        params: params
    })
}

export function departmentUpdate(data) {
    return request({
        url: '/dev/user-services/department/updateDepartment',
        method: 'put',
        data
    })
}

export function departmentBatchBan(params) {
    return request({
        url: '/dev/user-services/department/deleteDepartment',
        method: 'put',
        params: params
    })
}

// export function departmentDelete(params) {
//     return request({
//         url: '/dev/user-services/department/deleteDepartment',
//         method: 'delete',
//         params: params
//     })
// }

export function departmentStore(params) {
    return request({
        url: '/dev/user-services/department/newDepartment',
        method: 'post',
        params
    })
}

export function departmentList(params) {
    return request({
        url: '/dev/user-services/department/departmentsPage',
        method: 'get',
        params: params
    })
}
