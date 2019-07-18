import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

// import Button from '@material-ui/core/Button'
import {
  Tabs, Tab, List, CircularProgress,
} from '@material-ui/core'

import AppState from '../../store/app-state'
import TopicStore from '../../store/topic-store'
import Container from '../layout/container'
import TopicListItem from './list-item'

@inject((stores) => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
class TopicList extends React.Component {
  state = {
    tabIndex: 0,
  }

  componentDidMount() {
    const { topicStore } = this.props
    topicStore.fetchTopics()
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
    const { topicStore } = this.props
    const { topics, syncing } = topicStore

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
        <List>
          {
            topics.map(topic => (
              <TopicListItem
                key={topic.id}
                onClick={this.listItemClick}
                topic={topic}
              />
            ))
          }
        </List>
        {
          syncing
            ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '40px 0',
                }}
              >
                <CircularProgress color="primary" size={100} />
              </div>
            ) : null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,

}

export default TopicList
