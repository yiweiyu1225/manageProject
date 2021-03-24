const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        name: '@ctitle(14)',
        leading: '@cname()',
        time: '@date("yyyy-MM-dd HH:mm")',
        'state|1': ['待审核', '认可', '退回'],
        'id|0-100000': 100000
    }))
}

module.exports = [
    {
        url: '/vue-admin-template/table/ProInitExa/list',
        type: 'get',
        response: config => {
            const { name, leading, time, state, pagenum, pagesize } = config.query
            const mockList = List.filter(item => {
              if (name && item.name.indexOf(name) < 0) return false
              if (state && state !== item.state) return false
              if (leading && item.leading.indexOf(leading) < 0) return false
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
    }
]
