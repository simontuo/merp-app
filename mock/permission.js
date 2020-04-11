import Mock from 'mockjs'

const data = Mock.mock({
    'items|10': [{
        "id|+1": 1,
        name: '@name',
        label: '@cname',
    }]
})

export default [
    {
        url: '/permissions',
        type: 'get',
        response: config => {

            const items = data.items

            for (let index in items) {
                let children = Mock.mock({
                    'children|1-3': [
                        {
                            "id|11-100": 100,
                            name: '@name',
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