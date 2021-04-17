import {request} from "network/request";

export function requestEdit() {
  return request({
    method: "get",
    url: '/edit'
  })
}

export function requestEditByCharacter(videoPartId, text) {
  return request({
    method: "post",
    url: '/editByCharacter',
    params: {videoPartId},
    data: {text}
  })
}
