import request from '@/utils/request'

// 获取表格
export function getTable(params) {
  return request({
    url: '/vue-admin-template/table/myProRecordKeeplist/list',
    method: 'get',
    params
  })
}
// 删除备案项目
export function deleteTable(id) {
  return request({
    url: '/vue-admin-template/table/myProRecordKeeplist/delete',
    method: 'get',
    id
  })
}

// 新增项目
export function createTable(data) {
  return request({
    url: '/vue-admin-template/table/myProRecordKeeplist/create',
    method: 'post',
    data
  })
}
// 获取项目详情
export function getProject(id) {
  return request({
    url: '/vue-admin-template/table/myProRecordKeeplist/project',
    method: 'post',
    id
  })
}

// 预览并且提交 项目备案审核 sumit ProInitExamine
export function sumitProInitExamine(id) {
  return request({
    url: '/vue-admin-template/table/ProInitExamine/add',
    method: 'get',
    id
  })
}

// 申报项目管理 sumit applyProManage
export function applyProManage(id) {
  return request({
    url: '/vue-admin-template/table/applyProManage/add',
    method: 'get',
    id
  })
}
