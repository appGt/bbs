import {
  observable,
  action,
} from 'mobx'

import { post, get } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      recent_topics: [],
      recent_replies: [],
      syncing: false,
    },
    collections: {
      syncing: false,
      list: [],
    },
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post('/user/login', {}, {
        accessToken,
      }).then((resp) => {
        if (resp.success) {
          this.user.info = resp.data
          this.user.isLogin = true
          resolve()
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }

  @action getUserDetail() {
    this.user.detail.syncing = true
    return new Promise((resolve, reject) => {
      get(`/user/${this.user.info.loginname}`, {})
        .then((resp) => {
          if (resp.success) {
            this.user.detail.recent_topics = resp.data.recent_topics
            this.user.detail.recent_replies = resp.data.recent_replies
            resolve()
          } else {
            reject()
          }
          this.user.syncing = false
        }).catch((err) => {
          this.user.syncing = false
          reject(err)
        })
    })
  }

  @action getUserCollections() {
    this.user.collections.syncing = true
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${this.user.info.loginname}`, {})
        .then((resp) => {
          if (resp.success) {
            this.user.collections.list = resp.data
            resolve()
          } else {
            reject()
          }
          this.user.collections.syncing = false
        }).catch((err) => {
          this.user.collections.syncing = false
          reject(err)
        })
    })
  }
}
