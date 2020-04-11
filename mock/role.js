import Mock, { Random } from 'mockjs'

export default [
    {
        url: '/roles/123',
        type: 'get',
        response: config => {
            const permissionIds = Random.range(11, 50, 1)

            const role = {
                id: 123,
                name: 'admin',
                label: "管理员",
                desc: '超级无敌的神',
                permissionIds: permissionIds
            }

            return {
                code: 20000,
                data: role
            }

        }
    },

    {
        url: '/roles',
        type: 'get',
        response: config => {
            const { query, page = 1, pageSize = 20 } = config.query

            const list = Mock.mock({
                'items|10': [
                    {
                        id: '@increment',
                        name: '@name',
                        display_name: '@cname',
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
    },
]