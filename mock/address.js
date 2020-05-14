import Mock from "mockjs"

export default [
    {
        url: '/customer_addresses/[0-9]*',
        type: 'get',
        response: config => {
            const { id } = config.query

            return {
                code: 200,
                data: {
                    id: id,
                    name: '大力加冰',
                    contact: '@cname',
                    contact_phone: '15915863547',
                    contact_address: '66',
                    creator: '@cname'
                }
            }
        }
    },

    {
        url: '/customer_addresses/[0-9]*',
        type: 'put',
        response: config => {
            return {
                code: 200,
                message: '保存成功'
            }
        }
    },

    {
        url: '/customer_addresses',
        type: 'post',
        response: config => {
            return {
                code: 200,
                message: '保存成功'
            }
        }
    },

    {
        url: '/customer_addresses/delete',
        type: 'delete',
        response: config => {
            return {
                code: 200,
                message: '删除成功'
            }
        }
    },

    {
        url: '/customer_addresses',
        type: 'get',
        response: config => {
            const { query, page = 1, pageSize = 20 } = config.query

            const list = Mock.mock({
                'items|150': [
                    {
                        id: '@increment',
                        name: '@cname',
                        contact: '@cname',
                        contact_phone: /\d{11,11}/,
                        contact_address: '@county(true)',
                        creator: '@cname',
                        created_at: '@datetime',
                    }
                ]
            });

            let sortItems = list.items.reverse();

            const items = sortItems.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1));

            return {
                code: 200,
                data: {
                    total: list.items.length,
                    items: items
                }
            }

        }
    },
]