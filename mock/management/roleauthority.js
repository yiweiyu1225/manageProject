const Mock = require('mockjs')
const List = []
const length = 6
for (let i = 0; i < length; i++) {
    List.push(Mock.mock({
        id: i,
        name: '@cname(3)',
        'decribe|1': ['admin', 'editor'],
        time: '@date("yyyy-MM-dd HH:mm")'
    }))
}
module.exports = [
    // fetchComments 的 mock
    {
        // url 必须能匹配你的接口路由
        // 比如 fetchComments 对应的路由可能是 /article/1/comments 或者 /article/2/comments
        // 所以你需要通过正则来进行匹配
        url: '/vue-admin-template/management/roleauthority\.*',
        type: 'get', // 必须和你接口定义的类型一样
        response: (req, res) => {
          // 返回的结果
          // req and res detail see
          // https://expressjs.com/zh-cn/api.html#req
          return {
            code: 20000,
            data: {
              status: 'success',
              list: List,
              one: 'ok'
            }
          }
        }
      }
    ]
