import {request} from "network/request";

export function requestGetVideo(url) {
  return request({
    url: '/getFileStream',
    responseType: 'blob',
    params: {
      url
    }
  })
}
