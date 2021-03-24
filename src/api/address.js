import request from '@/utils/request'

export function getPlace() {
  return request({
    url: '/vue-admin-template/places',
    method: 'post'
  })
}
