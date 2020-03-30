import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo, title, logo, openSidebar, tableSize, pagination, footerInfo } = defaultSettings

const state = {
	showSettings: showSettings,
	fixedHeader: fixedHeader,
	sidebarLogo: sidebarLogo,
	title: title,
	logo: logo,
	openSidebar: openSidebar,
	tableSize: tableSize,
	pagination: pagination,
	footerInfo: footerInfo,
}

const mutations = {
	CHANGE_SETTING: (state, { key, value }) => {
		if (state.hasOwnProperty(key)) {
			state[key] = value
		}
	}
}

const actions = {
	changeSetting({ commit }, data) {
		commit('CHANGE_SETTING', data)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

