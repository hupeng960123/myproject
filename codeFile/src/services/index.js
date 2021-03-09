import {request} from '../utils/request'
export const api_user_info = (param) => {
  return request({
    method: 'get',
    url: '/user/views/api_user_info/',
    params: param
  })
}
export const api_jsc_index_info = (param) => {
  return request({
    method: 'post',
    url: '/jsc/views/api_jsc_index_info/',
    params: param
  })
}
export const v_login = (param) => {
  return request({
    method: 'post',
    url: '/v_login/',
    params: param
  })
}
export const api_jsc_url_redirect = (param) => {
  return request({
    method: 'get',
    url: '/jsc/views/api_jsc_url_redirect/',
    params: param
  })
}

