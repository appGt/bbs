import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'
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
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Button variant="contained" color="primary">contained</Button>
        <Button variant="outlined" color="primary">outlined</Button>
        <Button variant="text" color="primary">text</Button>
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
