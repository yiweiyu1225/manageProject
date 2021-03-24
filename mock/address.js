const Mock = require('mockjs')

const place = []

for (let i = 0; i < 30; i++) {
    place.push(Mock.mock({
        address_id: '@ctitle(5)',
        'children|0-10 ': [
            { 'address_id': '@ctitle(5)' },
            { 'children|0-10 ': [
                { 'address_id': '@ctitle(5)' }
            ] }
        ]
    }))
}
module.exports = [
    // fetchComments 的 mock
    {
        // url 必须能匹配你的接口路由
        // 比如 fetchComments 对应的路由可能是 /article/1/comments 或者 /article/2/comments
        // 所以你需要通过正则来进行匹配
        url: '/vue-admin-template/places',
        type: 'post', // 必须和你接口定义的类型一样
        response: config => {
          return {
            code: 20000,
            data: {
              status: 'success',
              places: place
            }
          }
        }
      }
    ]
