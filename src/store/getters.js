const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    id: state => state.user.id,
    name: state => state.user.name,
    table: state => state.app.table,
    roles: state => state.user.roles,
    tenant: state => state.user.tenant,
}
export default getters
