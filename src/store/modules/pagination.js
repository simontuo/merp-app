import defaultSettings from '@/settings'
import Cookies from 'js-cookie'

const { pagination } = defaultSettings

const state = {
    page: pagination.page,
    pageSize: parseInt(Cookies.get('pageSize')) || pagination.pageSize,
    pageSizes: pagination.pageSizes
}

const mutations = {
    CHANGE_PAGE_SIZE: (state, pageSize) => {
        state.pageSize = pageSize
        Cookies.set('pageSize', pageSize)
    }
}

const actions = {
    changePageSize({ commit }, data) {
        commit('CHANGE_PAGE_SIZE', data.val)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}