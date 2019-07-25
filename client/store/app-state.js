import {
  observable,
  action,
} from 'mobx'

import { post } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post('user/login', {}, {
        accessToken,
      }).then((resp) => {
        if (resp.success) {
          this.user.isLogin = true
          this.user.info = resp.data
          resolve()
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }
}
