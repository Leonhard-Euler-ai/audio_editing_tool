import {request} from "network/request";

export function requestPostMp3(currentIndex, file) {
  return request({
    url: '/upload/mp3',
    method: "post",
    params: {
      currentIndex
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: file
  })
}
