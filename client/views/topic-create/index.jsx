import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'
import SimpleMDE from 'react-simplemde-editor'

import {
  TextField,
  Radio,
  Fab,
  Snackbar,
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Reply } from '@material-ui/icons'

import Container from '../layout/container'
import { tabs } from '../../util/varible-define'
import createStyles from './styles'

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
    appState: stores.appState,
  }
}) @observer
class TopicCreate extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      content: '',
      tab: 'dev',
      open: false,
      message: '',
    }

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleTabChange(e) {
    this.setState({
      tab: e.target.value,
    })
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value.trim(),
    })
  }

  handleContentChange(content) {
    this.setState({
      content,
    })
  }

  handleCreate() {
    const { tab, title, content } = this.state
    if (!title) {
      return this.showMessage('title必须填写')
    }
    if (!content) {
      return this.showMessage('content必须填写')
    }

    return this.props.topicStore.createTopic(title, tab, content)
      .then(() => {
        this.props.history.push('/index')
      }).catch((err) => {
        this.showMessage(err.message)
      })
  }

  showMessage(message) {
    this.setState({
      open: true,
      message,
    })
  }

  handleClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    const { classes } = this.props
    const { message, open } = this.state
    return (
      <Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          message={message}
          open={open}
          onClose={this.handleClose}
        />
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={this.state.title}
            onChange={this.handleTitleChange}
            fullWidth
          />
          <SimpleMDE
            onChange={this.handleContentChange}
            value={this.state.newReply}
            options={{
              toolbar: false,
              spellChecker: false,
              placeholder: '发表你的精彩意见',
            }}
          />
          <div>
            {
              Object.keys(tabs).map((tab) => {
                if (tab !== 'all' && tab !== 'good') {
                  return (
                    <span className={classes.selectItem} key={tab}>
                      <Radio
                        value={tab}
                        checked={tab === this.state.tab}
                        onChange={this.handleChangeTab}
                      />
                      {tabs[tab]}
                    </span>
                  )
                }
                return null
              })
            }
          </div>
          <Fab variant="round" color="primary" onClick={this.handleCreate} className={classes.replyButton}>
            <Reply />
          </Fab>
        </div>
      </Container>
    )
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
}

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(withStyles(createStyles)(TopicCreate))
