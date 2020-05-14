import Mock from "mockjs"

export default [
    {
        url: '/orders',
        type: 'get',
        response: config => {
            const { query, page = 1, pageSize = 20 } = config.query

            const list = Mock.mock({
                'items|150': [
                    {
                        id: '@increment',
                        no: /\d{11,11}/,
                        customer_name: '@cname',
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
    }
]