import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import search from './modules/search'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import pagination from './modules/pagination'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        search,
        permission,
        tagsView,
        pagination
    },
    getters
})

export default store
