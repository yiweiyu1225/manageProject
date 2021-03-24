const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        name: '@sentence(5, 10)',
        leading: '@sentence(5, 10)',
        'state|1': ['未提交', '认可', '退回'],
        'id|0-100000': 100000
    }))
}

module.exports = [
    {
        url: '/vue-admin-template/table/ProInitExamine/add',
        type: 'get',
        response: _ => {
            return {
            code: 20000,
            data: 'success'
            }
        }
    }
]
