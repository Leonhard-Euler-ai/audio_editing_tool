import {CHANGE_LOGIN_STATUS} from './mutation-type'

const mutations = {
  [CHANGE_LOGIN_STATUS](state, payload) {
    state.isLogin = payload
  }
}

export default mutations
