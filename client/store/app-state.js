import {
  observable,
  computed,
  action,
} from 'mobx'

export class AppState {
  @observable count = 0

  @observable name = 'appGt'

  @computed get msg() {
    return `${this.name} say count ${this.count}`
  }

  @action add() {
    this.count += 1
  }
}

const appState = new AppState()

setInterval(() => {
  appState.add()
}, 1000)

export default appState
