import {request} from "network/request";

export function requestTest(url) {
  return request({
    method:"post",
    url: url
  })
}
