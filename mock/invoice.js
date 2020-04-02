import Mock from "mockjs"

export default [
    {
        url: '/invoices',
        type: 'get',
        response: config => {
            const { query, page = 1, pageSize = 20 } = config.query

            const list = Mock.mock({
                'items|150': [
                    {
                        id: '@increment',
                        seller: '@cname',
                        buyer: '@cname',
                        rate: /\d{1,1}/,
                        total_amount: /\d{2,4}/,
                        created_at: '@datetime',
                    }
                ]
            });

            let sortItems = list.items.reverse();

            const items = sortItems.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1));

            return {
                code: 20000,
                data: {
                    total: list.items.length,
                    items: items
                }
            }
        }
    }
]