import request from '@/utils/request'

export function departmentProfile(params) {
	return request({
		url: '/departments/' + params.id,
		method: 'get',
		params: params
	})
}

export function departmentUpdate(params) {
	return request({
		url: '/departments/' + params.id,
		method: 'put',
		params: params
	})
}

export function departmentDelete(params) {
	return request({
		url: '/departments/' + params.id,
		method: 'delete',
		params: params
	})
}

export function departmentStore(params) {
	return request({
		url: '/departments',
		method: 'post',
		params: params
	})
}

export function departmentList(params) {
	return request({
		url: '/departments',
		method: 'get',
		params: params
	})
}
