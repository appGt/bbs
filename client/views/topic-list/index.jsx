import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../store/app-state'

@inject('appState') @observer
class TopicList extends React.Component {
  bootstrap = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        appState.count = 3
        resolve(true)
      }, 0)
    })
  }

  changeName = (event) => {
    const { appState } = this.props
    appState.changeName(event.target.value)
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{appState.msg}</span>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
