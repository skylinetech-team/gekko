import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import * as importMutations from './modules/imports/mutations'
import * as gekkoMutations from './modules/gekkos/mutations'
import * as notificationMutations from './modules/notifications/mutations'
import * as configMutations from './modules/config/mutations'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'
const mutations = {}

_.merge(mutations, importMutations)
_.merge(mutations, gekkoMutations)
_.merge(mutations, notificationMutations)
_.merge(mutations, configMutations)

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {
    warnings: {
      connected: true // assume we will connect
    },
    imports: [],
    gekkos: {},
    archivedGekkos: {},
    connection: {
      disconnected: false,
      reconnected: false
    },
    apiKeys: [],
    exchanges: {}

  },
  mutations,
  actions: {

  },
  getters
})
