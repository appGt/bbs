import React from 'react'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { withStyles } from '@material-ui/styles'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

@inject((stores) => {
  return {
    appState: stores.appState,
  }
}) @observer
class MainAppBar extends React.Component {
  onHomeIconClick = () => {
    this.props.history.push('/index?tab=all')
  }

  onCreateButtonClick = () => {

  }

  loginButtonClick = () => {
    if (this.props.appState.user.isLogin) {
      this.props.history.push('/user/info')
    } else {
      this.props.history.push('/user/login')
    }
  }

  render() {
    const { classes } = this.props
    const { user } = this.props.appState
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              JNode
            </Typography>
            <Button variant="contained" color="primary" onClick={this.onCreateButtonClick}>
              新建话题
            </Button>
            {
              user.isLogin
                ? user.info.loginname
                : <Button variant="contained" color="primary" onClick={this.loginButtonClick}>登录</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(MainAppBar))
