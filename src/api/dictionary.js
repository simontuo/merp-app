import request from "@/utils/request"

export function goodsPageList(query) {
    return request({
        url: '/dev/dictionary-sevices/goodsControler/goodsrPage',
        method: 'get',
        params: query
    })
}

export function goodsProfile(params) {
    return request({
        url: '/dev/dictionary-sevices/goodsControler/getGoods/' + params.id,
        method: 'get',
        params: params
    })
}

export function goodsStore(data) {
    return request({
        url: '/dev/dictionary-sevices/goodsControler/newGoods',
        method: 'post',
        data
    })
}

export function goodsUpdate(data) {
    return request({
        url: '/dev/dictionary-sevices/goodsControler/updateGoods/' + params.id,
        method: 'put',
        data
    })
}

// export function goodsBatchDelete(params) {
//     return request({
//         url: '/goods/delete',
//         method: 'delete',
//         params: params
//     })
// }

export function goodsBtachBan(data) {
    return request({
        url: '/dev/dictionary-sevices/goodsControler/batchBan',
        method: 'put',
        data
    })
}

export function cosItemPageList(query) {
    return request({
        url: '/dev/dictionary-services/costControler/costPage',
        method: 'get',
        params: query
    })
}

export function costItemProfile(data) {
    return request({
        url: '/dev/dictionary-services/costControler/getCost/' + params.id,
        method: 'get',
        data
    })
}

export function costItemUpdate(data) {
    return request({
        url: '/dev/dictionary-services/costControler/updateCost/' + params.id,
        method: 'put',
        data
    })
}

export function costItemStore(data) {
    return request({
        url: '/dev/dictionary-services/costControler/newCost',
        method: 'post',
        data
    })
}

// export function costItemBatchDelete(params) {
//     return request({
//         url: '/cost_items/delete',
//         method: 'delete',
//         params: params
//     })
// }

export function costItemsBtachBan(data) {
    return request({
        url: '/dev/dictionary-services/costControler/batchBan',
        method: 'put',
        data
    })
}

export function supplierTypePageList(params) {
    return request({
        url: '/dev/dictionary-services/crmObjectControler/crmObjectPage',
        method: 'get',
        params: params
    })
}

export function supplierTypeProfile(params) {
    return request({
        url: '/dev/dictionary-services/crmObjectControler/getCrmObject/' + params.id,
        method: 'get',
        params: params
    })
}

export function supplierTypeStore(data) {
    return request({
        url: '/dev/dictionary-services/crmObjectControler/newCrmObject',
        method: 'post',
        data
    })
}

export function supplierTypeUpdate(data) {
    return request({
        url: '/dev/dictionary-services/crmObjectControler/updateCrmObject/' + params.id,
        method: 'put',
        data
    })
}

// export function supplierTypeBatchDelete(params) {
//     return request({
//         url: '/supplier_types/delete',
//         method: 'delete',
//         params: params
//     })
// }

export function supplierTypeBtachBan(data) {
    return request({
        url: '/dev/dictionary-services/crmObjectControler/batchBan',
        method: 'put',
        data
    })
}

export function containerTypePageList(query) {
    return request({
        url: '/dev/dictionary-services/containerControler/containerPage',
        method: 'get',
        params: query
    })
}

export function containerTypeProfile(params) {
    return request({
        url: '/dev/dictionary-services/containerControler/getContainer/' + params.id,
        method: 'get',
        params: params
    })
}

export function containerTypeStore(data) {
    return request({
        url: '/dev/dictionary-services/containerControler/newContainer',
        method: 'post',
        data
    })
}

export function containerTypeUpdate(data) {
    return request({
        url: '/dev/dictionary-services/containerControler/updateContainer/' + params.id,
        method: 'put',
        data
    })
}

export function containerTypeBatchDelete(params) {
    return request({
        url: '/container_types/delete',
        method: 'delete',
        params: params
    })
}

export function containerTypeBtachBan(data) {
    return request({
        url: '/dev/dictionary-services/containerControler/batchBan',
        method: 'put',
        data
    })
}