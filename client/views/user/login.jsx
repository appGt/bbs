import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import UserWrapper from './user'
import loginStyles from './styles/login-style'

@inject((stores) => {
  return {
    user: stores.appState.user,
    appState: stores.appState,
  }
}) @observer
class UserLogin extends React.Component {
  constructor() {
    super()
    this.state = {
      accessToken: '',
      helpText: '',
    }

    this.handInput = this.handInput.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentWillMount() {
    if (this.props.appState.user.isLogin) {
      this.props.history.push('/user/info')
    }
  }

  handInput(event) {
    this.setState({
      accessToken: event.target.value.trim(),
    })
  }

  handleLogin() {
    if (!this.state.accessToken) {
      return this.setState({
        helpText: '必须填写',
      })
    }
    this.setState({
      helpText: '',
    })
    return this.props.appState.login(this.state.accessToken)
      .then(() => {
        this.props.history.push('/user/info')
      }).catch((err) => {
        console.log(err) // eslint-disable-line
      })
  }

  render() {
    const { helpText, accessToken } = this.state
    const { classes } = this.props
    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="请输入Cnode AccessToken"
            placeholder="请输入Cnode AccessToken"
            required
            helperText={helpText}
            value={accessToken}
            onChange={this.handInput}
            className={classes.input}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            登录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}


export default withRouter(withStyles(loginStyles)(UserLogin))
