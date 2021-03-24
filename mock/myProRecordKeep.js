const Mock = require('mockjs')
const count = 100
const List = []
const contain = [`<p><img src = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg'></img></p>`]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    name: '@ctitle(14)',
    leading: '@cname()',
    time: '@date("yyyy-MM-dd HH:mm")',
    'state|1': ['未提交', '认可', '退回'],
    'id|0-100000': 100000
  }))
}

module.exports = [
  {
    url: '/vue-admin-template/table/myProRecordKeeplist/list\.*',
    type: 'get',
    response: config => {
      const { name, state, year, pagenum, pagesize } = config.query
      const mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (state && state !== item.state) return false
        if (year && item.time.indexOf(year) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < pagenum * pagesize && index >= pagesize * (pagenum - 1))
      const countPage = 100
      return {
        code: 20000,
        data: {
          total: count,
          totalpage: countPage,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/myProRecordKeeplist/delete\.*',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/table/myProRecordKeeplist/project',
    type: 'post',
    response: config => {
      // const x = contain.length
      const item = contain[0]
      return {
        code: 20000,
        data: {
          intruduce: item,
          leading: '1',
          name: '123'
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/myProRecordKeeplist/create',
    type: 'post',
    response: config => {
      const data = config.body
      contain.push(data)
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
