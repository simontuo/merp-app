import Mock from 'mockjs'

const data = Mock.mock({
	'items|10': [{
		id: '@id',
		label: '@cname',
	}]
})

export default [
	{
		url: '/departments/[0-9]*',
		type: 'get',
		response: config => {
			const { id } = config.query

			const data = {
				id: id,
				name: '大力部',
				mnemonic_code: "DLB",
			}

			return {
				code: 20000,
				data: data
			}

		}
	},

	{
		url: '/departments/[0-9]*',
		type: 'put',
		response: config => {
			return {
				code: 20000,
				message: '保存成功'
			}

		}
	},

	{
		url: '/departments/[0-9]*',
		type: 'delete',
		response: config => {
			return {
				code: 20000,
				message: '删除成功'
			}

		}
	},

	{
		url: '/departments',
		type: 'post',
		response: config => {

			return {
				code: 20000,
				message: '保存成功'
			}
		}
	},

	{
		url: '/departments',
		type: 'get',
		response: config => {

			const items = data.items

			for (let index in items) {
				let children = Mock.mock({
					'children|1-3': [
						{
							id: '@id',
							label: '@cname',
							children: []
						}
					]
				})
				items[index]['children'] = children.children;
			}

			return {
				code: 20000,
				data: {
					total: items.length,
					items: items
				}
			}
		}
	}
]