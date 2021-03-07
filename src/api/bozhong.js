import request from '@/utils/request'

export function seedList() {
  return request({
    url: '/seed/list',
    method: 'get',
  })
}

export function detail(id) {
  return request({
    url: '/seed/'+id,
    method: 'get',
  })
}

export function deletes(ids) {
  return request({
    url: '/seed/'+ids,
    method: 'delete',
  })
}

export function create(data) {
  return request({
    url: '/seed',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/seed',
    method: 'put',
    data
  })
}
