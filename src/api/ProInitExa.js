import request from '@/utils/request'

export function getTable(params) {
    return request({
      url: '/vue-admin-template/table/ProInitExa/list',
      method: 'get',
      params
    })
}
