import Cookies from 'js-cookie'
import defaultSettings from '@/settings'

const state = {
	sidebar: {
		opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : defaultSettings.openSidebar,
		withoutAnimation: false
	},
	device: 'desktop',
	table: {
		size: Cookies.get('tableSize'),
	},
}

const mutations = {
	TOGGLE_SIDEBAR: state => {
		state.sidebar.opened = !state.sidebar.opened
		state.sidebar.withoutAnimation = false
		if (state.sidebar.opened) {
			Cookies.set('sidebarStatus', 1)
		} else {
			Cookies.set('sidebarStatus', 0)
		}
	},
	CLOSE_SIDEBAR: (state, withoutAnimation) => {
		Cookies.set('sidebarStatus', 0)
		state.sidebar.opened = false
		state.sidebar.withoutAnimation = withoutAnimation
	},
	TOGGLE_DEVICE: (state, device) => {
		state.device = device
	},
	CHANGE_TABLE_SIZE: (state, tableSize) => {
		state.table.size = tableSize
		Cookies.set('tableSize', tableSize)
	},
}

const actions = {
	toggleSideBar({ commit }) {
		commit('TOGGLE_SIDEBAR')
	},
	closeSideBar({ commit }, { withoutAnimation }) {
		commit('CLOSE_SIDEBAR', withoutAnimation)
	},
	toggleDevice({ commit }, device) {
		commit('TOGGLE_DEVICE', device)
	},
	changeTableSize({ commit }, tableSize) {
		commit('CHANGE_TABLE_SIZE', tableSize.command)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
