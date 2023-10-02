import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(data) {
    return ApiService.fetchData({
        url: '/sales/products',
        method: 'post',
        data,
    })
}

export async function apiFilteredFolder(data) {
    return ApiService.fetchData({
        url: `https://api.voagstech.com/api/folder?filter=${data.query}`,
        method: 'get',
    })
}

export async function apiFilteredDocument(data) {
    return ApiService.fetchData({
        url: `https://api.voagstech.com/api/document?filter=${data.query}`,
        method: 'get',
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiDeleteFolder(data) {
    return ApiService.fetchData({
        url: `${process.env.REACT_APP_URL}folder/${data}`,
        method: 'delete',
        // data,
    })
}

export async function apiDeleteDocument(data) {
    return ApiService.fetchData({
        url: `${process.env.REACT_APP_URL}document/${data}`,
        method: 'delete',
        // data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: '/sales/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders(params) {
    return ApiService.fetchData({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}
