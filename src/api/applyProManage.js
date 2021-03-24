import request from '@/utils/request'

export function getTable(params) {
    return request({
      url: '/vue-admin-template/table/applyProManage/list',
      method: 'get',
      params
    })
}

export function getProgressList(id) {
  return request({
    url: '/vue-admin-template/table/applyProManage/ProgressList',
    method: 'get'
  })
}
