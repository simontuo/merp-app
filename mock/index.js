import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'
import table from './table'
import search from './remote-search'
import promote from './promote'
import article from './article'
import department from './department'
import role from './role'
import customer from './customer'
import supplier from './supplier'
import order from './order'
import cost from './cost'
import invoice from './invoice'
import goods from './goods'
import costItem from './cost-item'
import permission from './permission'
import address from './address'
import supplierType from './supplier-type'
import tenant from './tenant'
import dictionary from './dictionary'

const mocks = [
	...user,
	...table,
	...search,
	...promote,
	...article,
	...department,
	...role,
	...customer,
	...supplier,
	...order,
	...cost,
	...invoice,
	...goods,
	...costItem,
	...permission,
	...address,
	...supplierType,
	...tenant,
	...dictionary,
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
	// mock patch
	// https://github.com/nuysoft/Mock/issues/300
	Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
	Mock.XHR.prototype.send = function () {
		if (this.custom.xhr) {
			this.custom.xhr.withCredentials = this.withCredentials || false

			if (this.responseType) {
				this.custom.xhr.responseType = this.responseType
			}
		}
		this.proxy_send(...arguments)
	}

	function XHR2ExpressReqWrap(respond) {
		return function (options) {
			let result = null
			if (respond instanceof Function) {
				const { body, type, url } = options
				// https://expressjs.com/en/4x/api.html#req
				result = respond({
					method: type,
					body: JSON.parse(body),
					query: param2Obj(url)
				})
			} else {
				result = respond
			}
			return Mock.mock(result)
		}
	}

	for (const i of mocks) {
		Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
	}
}

// for mock server
const responseFake = (url, type, respond) => {
	return {
		url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
		type: type || 'get',
		response(req, res) {
			console.log('request invoke:' + req.path)
			res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
		}
	}
}

export default mocks.map(route => {
	return responseFake(route.url, route.type, route.response)
})
