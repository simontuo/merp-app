import Mock from "mockjs"

export default [
    {
        url: '/customers/remote',
        type: 'get',
        response: config => {
            const { query } = config.query

            const list = Mock.mock({
                'items|150': [
                    {
                        id: '@increment',
                        name: '@cname',
                        mnemonicCode: '@name'
                    }
                ]
            });

            let sortItems = list.items.reverse();

            return {
                code: 200,
                data: {
                    items: sortItems
                }
            }

        }
    },

    {
        url: '/customers/[0-9]*',
        type: 'get',
        response: config => {
            const { id } = config.query

            return {
                code: 200,
                data: {
                    id: id,
                    name: '大力加冰',
                    mnemonic_code: 'DLJB',
                    contact: '@cname',
                    contact_phone: '15915863547',
                    contact_address: '66'
                }
            }
        }
    },

    {
        url: '/customers/[0-9]*',
        type: 'put',
        response: config => {
            return {
                code: 200,
                message: '保存成功'
            }
        }
    },

    {
        url: '/customers',
        type: 'post',
        response: config => {
            return {
                code: 200,
                message: '保存成功'
            }
        }
    },

    {
        url: '/customers/batch_ban',
        type: 'put',
        response: config => {
            return {
                code: 200,
                message: '禁用成功'
            }
        }
    },

    {
        url: '/customers',
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