import Cookies from 'js-cookie'

const state = {
    loading: false,
    items: [],
    total: 0,
    hidden: Cookies.get('searchFormHiddenItem') ? !!+Cookies.get('searchFormHiddenItem') : true,
}

const mutations = {
    LOADING_ON: state => {
        state.loading = true
    },
    LOADING_OFF: state => {
        state.loading = false
    },
    GET_DATA: (state, response) => {
        state.items = response.data.items;
        state.total = response.data.total;
    },
    TOGGLE_HIDDEN: state => {
        state.hidden = !state.hidden
        if (state.hidden) {
            Cookies.set('searchFormHiddenItem', 1)
        } else {
            Cookies.set('searchFormHiddenItem', 0)
        }
    },
}

const actions = {
    loadingOn({ commit }) {
        commit("LOADING_ON")
    },
    loadingOff({ commit }) {
        commit("LOADING_OFF")
    },
    getData({ commit }, { response }) {
        commit("GET_DATA", response)
    },
    toggleHidden({ commit }) {
        commit("TOGGLE_HIDDEN")
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
