import {request} from "network/request";

export function requestUpload() {
  return request({
    method: "post",
    url: '/upload/videoa',
  })
}
