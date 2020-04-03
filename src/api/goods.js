import request from "@/utils/request"

export function fetchList(query) {
	return request({
		url: '/goods',
		method: 'get',
		params: query
	})
}