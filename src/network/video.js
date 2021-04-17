import {request} from "network/request";

export function requestGetVideo(imgUrl) {
  return request({
    url: '/getFileStream',
    responseType: 'blob',
    params: {
      imgUrl
    }
  })
}
