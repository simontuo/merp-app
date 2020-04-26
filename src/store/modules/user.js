import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getTenant, setTenant } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        id: '',
        name: '',
        avatar: '',
        introduction: '',
        tenant: getTenant(),
        roles: []
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_TENANT: (state, tenant) => {
        state.tenant = tenant
    }
}

const actions = {
    // user login
    // login({ commit }, userInfo) {
    //     const { username, password } = userInfo
    //     return new Promise((resolve, reject) => {
    //         login({ username: username.trim(), password: password }).then(response => {
    //             const { data } = response
    //             commit('SET_TOKEN', data.token)
    //             setToken(data.token)
    //             resolve()
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },
    login({ commit }, form) {
        return new Promise((resolve, reject) => {
            login(form).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, id, name, avatar } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_ID', id)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                // commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },

    // set tenant
    setTenant({ commit }, tenant) {
        return new Promise(resolve => {
            commit('SET_TENANT', tenant)
            setTenant(tenant)
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

