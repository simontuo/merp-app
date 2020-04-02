import request from "@/utils/request"

export function fetchList(query) {
	return request({
		url: '/costs',
		method: 'get',
		params: query
	})
}