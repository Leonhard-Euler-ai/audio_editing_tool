import {request} from "network/request";

export function requestLogin(username, password, verCode) {
  return request({
    method:"post",
    url: '/login',
    data: {
      username,
      password,
      verCode
    }
  })
}
