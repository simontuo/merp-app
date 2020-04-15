import request from "@/utils/request"

export function supplierTypePageList(params) {
	return request({
		url: '/supplier_types',
		method: 'get',
		params: params
	})
}

export function supplierTypeProfile(params) {
	return request({
		url: '/supplier_types/' + params.id,
		method: 'get',
		params: params
	})
}

export function supplierTypeStore(params) {
	return request({
		url: '/supplier_types',
		method: 'post',
		params: params
	})
}

export function supplierTypeUpdate(params) {
	return request({
		url: '/supplier_types/' + params.id,
		method: 'put',
		params: params
	})
}

export function supplierTypeBatchDelete(params) {
	return request({
		url: '/supplier_types/delete',
		method: 'delete',
		params: params
	})
}