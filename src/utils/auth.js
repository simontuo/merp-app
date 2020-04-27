import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TenantKey = 'vue_admin_template_tenant'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function getTenant() {
    let teant = Cookies.get(TenantKey)
    return JSON.parse(teant)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function setTenant(tenant) {
    return Cookies.set(TenantKey, tenant)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
