import request from "@/utils/request"

export function goodsPageList(query) {
	return request({
		url: '/goods',
		method: 'get',
		params: query
	})
}

export function goodsProfile(params) {
	return request({
		url: '/goods/' + params.id,
		method: 'get',
		params: params
	})
}

export function goodsStore(params) {
	return request({
		url: '/goods',
		method: 'post',
		params: params
	})
}

export function goodsUpdate(params) {
	return request({
		url: '/goods/' + params.id,
		method: 'put',
		params: params
	})
}

export function goodsBatchDelete(params) {
	return request({
		url: '/goods/delete',
		method: 'delete',
		params: params
	})
}

export function cosItemPageList(query) {
	return request({
		url: '/cost_items',
		method: 'get',
		params: query
	})
}

export function costItemProfile(params) {
	return request({
		url: '/cost_items/' + params.id,
		method: 'get',
		params: params
	})
}

export function costItemUpdate(params) {
	return request({
		url: '/cost_items/' + params.id,
		method: 'put',
		params: params
	})
}

export function costItemStore(params) {
	return request({
		url: '/cost_items',
		method: 'post',
		params: params
	})
}

export function costItemBatchDelete(params) {
	return request({
		url: '/cost_items/delete',
		method: 'delete',
		params: params
	})
}

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