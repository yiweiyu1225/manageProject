const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        name: '@ctitle(14)',
        kind: '市级计划项目',
        leading: '@cname()',
        time: '@date("yyyy-MM-dd HH:mm")',
        'state|1': ['未提交', '待推荐', '已推荐', '推荐退回', '已受理', '受理退回', '初审通过'],
        'id|0-100000': 100000
    }))
}

const progressList = []
const progressCount = 5

for (let i = 0; i < progressCount; i++) {
    progressList.push(Mock.mock({
        content: '@ctitle(6)',
        timestamp: '@date("yyyy-MM-dd HH:mm")'
    }))
}

module.exports = [
    {
        url: '/vue-admin-template/table/applyProManage/list\.*',
        type: 'get',
        response: config => {
            const { name, kind, state, time, pagenum, pagesize } = config.query
            const mockList = List.filter(item => {
              if (name && item.name.indexOf(name) < 0) return false
              if (state && state !== item.state) return false
              if (kind && kind !== item.kind) return false
              if (time && item.year.indexOf(time) < 0) return false
              return true
            })
            const pageList = mockList.filter((item, index) => index < pagenum * pagesize && index >= pagesize * (pagenum - 1))
            return {
            code: 20000,
            data: {
                total: count,
                items: pageList
              }
            }
        }
    },
    {
        url: '/vue-admin-template/table/applyProManage/ProgressList',
        type: 'get',
        response: _ => {
            return {
            code: 20000,
            data: {
                items: progressList,
                total: count
              }
            }
        }
    }
]
