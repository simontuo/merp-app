import request from "@/utils/request"

export function fetchList(query) {
	return request({
		url: '/cost_items',
		method: 'get',
		params: query
	})
}