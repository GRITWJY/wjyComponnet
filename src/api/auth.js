import request from '../core/request'

export function login(data) {
  return request({
    url: `/auth/login`,
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: `/auth/logout`,
    method: 'post'
  })
}

export function info() {
  return request({
    url: `/auth/info`,
    method: 'post'
  })
}
