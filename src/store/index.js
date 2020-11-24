import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('tokens')
  },
  mutations: {
    setToken (state, tokens) {
      state.user = tokens
      setItem('tokens', tokens)
    }
  },
  actions: {
  },
  modules: {
  }
})
