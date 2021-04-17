import {request} from "network/request";

export function requestImg(imgUrl) {
  return request({
    // method: "get",
    url: '/getFileStream',
    responseType: 'blob',
    params: {
      imgUrl
    }
  })
}
