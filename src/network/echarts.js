import {request} from "network/request";

export function requestEchartsData(startTime, endTime) {
  return request({
    method: "get",
    url: '/echarts',
    params: {startTime, endTime}
  })
}
