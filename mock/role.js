import Mock, { Random } from 'mockjs'

export default [
    {
        url: '/roles/[0-9]*',
        type: 'get',
        response: config => {
            const { id } = config.query
            const permissionIds = Random.range(11, 50, 1)

            const role = {
                id: id,
                name: 'admin',
                label: "管理员",
                desc: '超级无敌的神',
                permissionIds: permissionIds,
                bindIds: '@range(1, 10, 3)'
            }

            return {
                code: 20000,
                data: role
            }

        }
    },

    {
        url: '/roles/[0-9]*',
        type: 'put',
        response: config => {
            return {
                code: 20000,
                message: "编辑成功"
            }
        }
    },

    {
        url: '/roles/[0-9]*/bind',
        type: 'put',
        response: config => {
            return {
                code: 20000,
                message: "绑定成功"
            }
        }
    },

    {
        url: '/roles/delete',
        type: 'delete',
        response: config => {
            return {
                code: 20000,
                message: "删除成功"
            }

        }
    },

    {
        url: '/roles',
        type: 'post',
        response: config => {
            return {
                code: 20000,
                message: "新增成功"
            }

        }
    },

    {
        url: '/roles',
        type: 'get',
        response: config => {
            const { query, page = 1, pageSize = 20 } = config.query

            const list = Mock.mock({
                'items|30': [
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