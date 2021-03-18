import {CHANGE_LOGIN_STATUS} from './mutation-type'

const actions = {
  loginSucceed(context,payload) {
    return new Promise(resolve => {
      context.commit(CHANGE_LOGIN_STATUS, payload)
        resolve('登录成功')
    })
  },

  logout(context){
    return new Promise(resolve => {
      context.commit(CHANGE_LOGIN_STATUS, "")
      resolve('退出登录')
    })
  }
}

export default actions
