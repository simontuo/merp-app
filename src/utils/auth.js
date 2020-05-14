import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TenantKey = 'vue_admin_template_tenant'
const TenantHostKey = 'vue_admin_template_tenant_host'

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

export function removeTenant() {
    return Cookies.remove(TenantKey)
}

export function setTenantHost(host) {
    return Cookies.set(TenantHostKey, host)
}

export function getTenantHost() {
    return Cookies.get(TenantHostKey)
}

export function removeTenantHost() {
    return Cookies.remove(TenantHostKey)
}

export function getLoginedUserId() {
    return Cookies.get('userId')
}

export function setLoginedUserId(id) {
    return Cookies.set('userId', id)
}

export function removeLoginedUserId() {
    return Cookies.remove('userId')
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
