import request from "@/utils/request"



export function customerProfile(params) {
	return request({
		url: '/customers/' + params.id,
		method: 'get',
		params: params
	})
}

export function customerUpdate(params) {
	return request({
		url: '/customers/' + params.id,
		method: 'put',
		params: params
	})
}

export function customerPageList(params) {
	return request({
		url: '/customers',
		method: 'get',
		params: params
	})
}