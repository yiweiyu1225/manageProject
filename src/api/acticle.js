import request from '@/utils/request'

export function postActicle(params) {
  return request({
    url: '/vue-admin-template/test/article',
    method: 'post',
    params
  })
}
