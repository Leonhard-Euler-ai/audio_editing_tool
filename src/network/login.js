import {request} from "network/request";

export function requestLogin(username, password, verCode) {
  return request({
    url: '/login',
    params: {
      username,
      password,
      verCode
    }
  })
}
