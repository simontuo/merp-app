import request from "@/utils/request"

export function containerTypePageList(query) {
	return request({
		url: '/container_types',
		method: 'get',
		params: query
	})
}

export function containerTypeProfile(params) {
	return request({
		url: '/container_types/' + params.id,
		method: 'get',
		params: params
	})
}

export function containerTypeStore(params) {
	return request({
		url: '/container_types',
		method: 'post',
		params: params
	})
}

export function containerTypeUpdate(params) {
	return request({
		url: '/container_types/' + params.id,
		method: 'put',
		params: params
	})
}

export function containerTypeBatchDelete(params) {
	return request({
		url: '/container_types/delete',
		method: 'delete',
		params: params
	})
}