import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import queryString from 'query-string'

// import Button from '@material-ui/core/Button'
import {
  Tabs, Tab, List, CircularProgress,
} from '@material-ui/core'

import AppState from '../../store/app-state'
import TopicStore from '../../store/topic-store'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../util/varible-define'

@inject((stores) => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.changeTab = this.changeTab.bind(this)
  }

  componentDidMount() {
    const tab = this.getTab()
    const { topicStore } = this.props
    topicStore.fetchTopics(tab)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
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

  getTab = (search) => {
    search = search || this.props.location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
  }

  listItemClick = () => {

  }

  changeTab(e, value) {
    this.props.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }

  render() {
    // const { appState } = this.props
    const { topicStore } = this.props
    const { topics, syncing } = topicStore
    const tab = this.getTab()

    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        <Tabs value={tab} onChange={this.changeTab}>
          {
            Object.keys(tabs).map(t => (
              <Tab key={t} label={tabs[t]} value={t} />
            ))
          }
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

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(TopicList)
