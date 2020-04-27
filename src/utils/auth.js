import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TenantKey = 'vue_admin_template_tenant'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function getTenant() {
    let tenant = Cookies.get(TenantKey)

    return tenant ? JSON.parse(tenant) : ''
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
