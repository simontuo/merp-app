import Mock from 'mockjs'

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        avatar: 'https://cdn.learnku.com/uploads/avatars/7032_1480088436.jpeg!/both/100x100',
        email: '1838919027@qq.com',
        phone: 15915863547,
        name: '大力加冰',
        id: 1,
    },
    // 'admin-token': {
    //     roles: ['admin'],
    //     introduction: 'I am a super administrator',
    //     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    //     name: 'Super Admin'
    // },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}


export default [
    // user login
    {
        url: '/login',
        type: 'post',
        response: config => {
            const { phone } = config.body
            let username = '';
            if (phone == '15915863547') {
                username = 'admin'
            } else {
                username = 'editor'
            }
            const token = tokens[username]

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect.'
                }
            }

            return {
                code: 200,
                data: token,
            }
        }
    },

    // get user info
    {
        url: '/users/info\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 508,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: info
            }
        }
    },

    {
        url: '/users/tenants',
        type: 'get',
        response: config => {
            let data = {
                items: [
                    {
                        id: 1,
                        name: "大力出奇迹有限公司",
                        default: false,
                        enable: true
                    },
                    {
                        id: 2,
                        name: "保级利亚有限公司",
                        default: false,
                        enable: true
                    },
                    {
                        id: 3,
                        name: "金坷垃大力有限公司",
                        default: false,
                        enable: true
                    }
                ]
            };

            return {
                code: 200,
                data: data
            }

        }
    },

    {
        url: '/users/remote_list',
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
        url: '/users/[0-9]*',
        type: 'get',
        response: config => {
            const { id } = config.query

            const data = {
                id: id,
                name: '大力加冰',
                phone: "15915863547",
                email: '1838919027@qq.com'
            }

            return {
                code: 200,
                data: data
            }

        }
    },

    // user logout
    {
        url: '/logout',
        type: 'post',
        response: _ => {
            return {
                code: 200,
                data: 'success'
            }
        }
    },

    // user list 
    {
        url: '/users/list',
        type: 'get',
        response: config => {

            const list = Mock.mock({
                'items|10': [
                    {
                        label: '@cname',
                        "key|+1": 1,
                        pinyin: '@name',
                    }
                ]
            });

            return {
                code: 200,
                data: {
                    items: list.items
                }
            }
        }
    },

    {
        url: '/users/ban',
        type: 'put',
        response: config => {
            return {
                code: 200,
                message: '禁用成功'
            }

        }
    },

    {
        url: '/users/reset_password',
        type: 'put',
        response: config => {
            return {
                code: 200,
                message: '重置成功'
            }

        }
    },

    {
        url: '/users/[0-9]*',
        type: 'put',
        response: config => {
            return {
                code: 200,
                message: '保存成功'
            }

        }
    },

    // user store
    {
        url: '/users',
        type: 'post',
        response: _ => {
            return {
                code: 200,
                message: '用户新增成功'
            }
        }
    },

    // user page list
    {
        url: '/users',
        type: 'get',
        response: config => {
            const { query, page = 1, pageSize = 20 } = config.query

            const list = Mock.mock({
                'items|150': [
                    {
                        id: '@increment',
                        name: '@cname',
                        phone: '@id',
                        email: '@email',
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
