import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

// import Button from '@material-ui/core/Button'
import { Tabs, Tab } from '@material-ui/core'

import AppState from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'

@inject('appState') @observer
class TopicList extends React.Component {
  state = {
    tabIndex: 0,
  }

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

  changeTab = (e, index) => {
    this.setState({
      tabIndex: index,
    })
  }

  listItemClick = () => {

  }

  render() {
    // const { appState } = this.props
    const { tabIndex } = this.state
    const topic = {
      title: 'This is title',
      username: 'appGt',
      replay_count: 20,
      visit_count: 30,
      create_at: '2015-01-03',
      tab: 'share',
    }
    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <TopicListItem onClick={this.listItemClick} topic={topic} />
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
