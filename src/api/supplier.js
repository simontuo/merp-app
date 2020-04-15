import request from "@/utils/request"

export function supplierPageList(query) {
	return request({
		url: 'suppliers',
		method: 'get',
		params: query
	})
}

export function supplierProfile(params) {
	return request({
		url: '/suppliers/' + params.id,
		method: 'get',
		params: params
	})
}

export function supplierUpdate(params) {
	return request({
		url: '/suppliers/' + params.id,
		method: 'put'
	})
}

export function supplierStore(query) {
	return request({
		url: 'suppliers',
		method: 'post',
		params: query
	})
}

export function supplierBatchBan(query) {
	return request({
		url: 'suppliers/ban',
		method: 'put',
		params: query
	})
}