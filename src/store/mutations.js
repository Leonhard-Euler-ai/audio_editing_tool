import {CHANGE_LOGIN_STATUS} from './mutation-type'

const mutations = {
  [CHANGE_LOGIN_STATUS](state, payload) {
    state.authorization = payload
  }
}

export default mutations
