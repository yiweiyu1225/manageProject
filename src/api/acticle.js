import request from '@/utils/request'

export function postActicle(params) {
  return request({
    url: '/vue-admin-template/places',
    method: 'post',
    params
  })
}
