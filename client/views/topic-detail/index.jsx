import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import marked from 'marked'
import Helmet from 'react-helmet'
import {
  observer,
  inject,
} from 'mobx-react'

import {
  CircularProgress,
  Paper,
  Button,
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Replay } from '@material-ui/icons'

import dateFormat from 'dateformat'
import SimpleMDE from 'react-simplemde-editor'

import Container from '../layout/container'
import Reply from './reply'
import { topicDetailStyle } from './style'

@inject((stores) => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
    user: stores.appState.user,
  }
}) @observer
class TopicDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      newReply: '',
    }
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this)
    this.goToLogin = this.goToLogin.bind(this)
    this.doReply = this.doReply.bind(this)
  }

  componentDidMount() {
    const id = this.getTopicId()
    this.props.topicStore.getTopicDetail(id)
  }

  getTopicId() {
    return this.props.match.params.id
  }

  handleNewReplyChange(value) {
    this.setState({
      newReply: value,
    })
  }

  goToLogin() {
    this.props.history.push('/user/login')
  }

  doReply() {
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    topic.doReply(this.state.newReply)
      .then(() => {
        this.setState({
          newReply: '',
        })
      }).catch((err) => {
        console.log(err) //eslint-disable-line
      })
  }

  render() {
    const {
      classes,
      user,
    } = this.props
    const id = this.getTopicId()
    const topic = this.props.topicStore.detailMap[id]
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress />
          </section>
        </Container>
      )
    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>

        {
          topic.createdReplies && topic.createdReplies.length > 0
            ? (
              <Paper evevation={4} className={classes.replies}>
                <header className={classes.replyHeader}>
                  <span>我的最新回复</span>
                  <span>{`${topic.createdReplies.length}条`}</span>
                </header>
                {
                  topic.createdReplies.map(reply => (
                    <Reply
                      key={reply.id}
                      reply={Object.assign({}, reply, {
                        author: {
                          avatar_url: user.info.avatar_url,
                          loginname: user.info.loginname,
                        },
                      })} />
                  ))
                }
              </Paper>
            )
            : null
        }

        <Paper evevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${dateFormat(topic.last_reply_at, 'yyyy-MM-dd HH:mm:ss')}`}</span>
          </header>
          {
            user.isLogin
              ? (
                <section className={classes.replyEditor}>
                  <SimpleMDE
                    onChange={this.handleNewReplyChange}
                    value={this.state.newReply}
                    options={{
                      toolbar: false,
                      autofocus: false,
                      spellChecker: false,
                      placeholder: '添加您的回复',
                    }} />
                  <Button color="primary" onClick={this.doReply} className={classes.replyButton}><Replay /></Button>
                </section>
              )
              : null
          }
          {
            !user.isLogin && (
              <section className={classes.notLoginButton}>
                <Button variant="contained" color="primary" onClick={this.goToLogin}>登录并回复</Button>
              </section>
            )
          }
          <section>
            {
              topic.replies.map(reply => <Reply key={reply.id} reply={reply} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(withStyles(topicDetailStyle)(TopicDetail))
