import Mock from "mockjs"

export default [
    {
        url: '/tenants/list',
        type: 'get',
        response: config => {
            let data = [
                {
                    name: "大力出奇迹有限公司",
                    default: false
                },
                {
                    name: "保级利亚有限公司",
                    default: false
                },
                {
                    name: "金坷垃大力有限公司",
                    default: false
                }
            ];

            return {
                code: 20000,
                data: data
            }

        }
    }
]