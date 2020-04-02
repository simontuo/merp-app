import request from "@/utils/request"

export function fetchList(query) {
	return request({
		url: 'suppliers',
		method: 'get',
		params: query
	})
}