const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')
const acticle = require('./acticle')
const myProRecordKeep = require('./myProRecordKeep') // 我的项目备案
const applyProManage = require('./applyProManage') // 申请项目管理
const proInitExamine = require('./proInitExamine') // 在【申报项目管理】页新增一条项目信息。要求数据准确。
const ProInitExa = require('./ProInitExa') // 项目备案审核
const address = require('./address')
const peoplemanage = require('./management/people')
const role = require('./management/role')
const roleauthority = require('./management/roleauthority')
const mocks = [
  ...user,
  ...table,
  ...acticle,
  ...myProRecordKeep,
  ...applyProManage,
  ...proInitExamine,
  ...ProInitExa,
  ...address,
  ...peoplemanage,
  ...role,
  ...roleauthority
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

