import request from '@/utils/request'

export function fetchList(params) {
  console.log('api')
  return request({
    url: '/vue-element-admin/member/list',
    method: 'get',
    params: params
  })
}

export function fetchMember(id) {
  return request({
    url: 'vue-element-admin/member/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/member/pv',
    method: 'get',
    params: { pv }
  })
}

export function createMember(data) {
  return request({
    url: '/vue-element-admin/member/create',
    method: 'post',
    data
  })
}

export function updateMember(data) {
  return request({
    url: '/vue-element-admin/member/update',
    method: 'post',
    data
  })
}
