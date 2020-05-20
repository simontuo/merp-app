import request from '@/utils/request'

export function sentVerifyCode(params) {
    return request({
        url: '/dev/message-services/hwyMessage/sendVerifyCode',
        method: 'get',
        params: params
    })
}