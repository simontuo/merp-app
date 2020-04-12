import Mock from "mockjs"

export default [
    {
        url: '/goods/[0-9]*',
        type: 'get',
        response: config => {
            const { id } = config.query

            const data = {
                id: id,
                name: '苹果手机',
                mnemonic_code: "pgsj",
            }

            return {
                code: 20000,
                data: data
            }

        }
    },

    {
        url: '/goods/[0-9]*',
        type: 'put',
        response: config => {
            return {
                code: 20000,
                message: '保存成功'
            }

        }
    },

    {
        url: '/goods',
        type: 'post',
        response: config => {

            return {
                code: 20000,
                message: '保存成功'
            }
        }
    },

    {
        url: '/goods',
        type: 'get',
        response: config => {
            const { query, page = 1, pageSize = 20 } = config.query

            const list = Mock.mock({
                'items|10': [
                    {
                        id: '@increment',
                        name: '@cname',
                        mnemonic_code: '@name',
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