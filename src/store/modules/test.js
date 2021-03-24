import { postActicle } from '@/api/acticle'

const actions = {

    postActicle({ commit }, userInfo) {
        // 发起网络请求
        const { name } = userInfo
        return new Promise((resolve, reject) => {
            postActicle({ name }).then(response => {
            const data = response.data.status
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
      }
}

export default {
    namespaced: true,
    actions
}
