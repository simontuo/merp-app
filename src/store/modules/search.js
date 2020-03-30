const state = {
	loading: false,
	items: [],
	total: 0,
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
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
