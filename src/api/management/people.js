import request from '@/utils/request'

export function gettable(params) {
    return request({
      url: '/vue-admin-template/management/people',
      method: 'get',
      params
    })
  }
