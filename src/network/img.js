import {request} from "network/request";

export function requestImg(url) {
  return request({
    // method: "get",
    url: '/getFileStream',
    responseType: 'blob',
    params: {
      url
    }
  })
}
