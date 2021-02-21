import {CHANGE_LOGIN_STATUS} from './mutation-type'

const actions = {
  loginSucceed(context) {
    return new Promise((resolve,reject) => {
        context.commit(CHANGE_LOGIN_STATUS, true)
        resolve('登录成功')
    })
  },

  cancelLogin(context){
    return new Promise((resolve,reject) => {
      context.commit(CHANGE_LOGIN_STATUS, false)
      resolve('取消登录成功')
    })
  }
}

export default actions
