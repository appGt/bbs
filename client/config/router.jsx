import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import TopicList from '../views/topic-list'
import ToppicDetail from '../views/topic-detail'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'
import TopicCreate from '../views/topic-create'

import TestApi from '../views/test/api.test'

const PrivateRoute = ({ appState, component: Component, ...rest }) => {
  // console.log(rest.path + ':' + JSON.stringify(appState.user)) //eslint-disable-line
  return (
    <Route
      {...rest}
      render={
        props => (appState.user.isLogin ? <Component {...props} /> : <Redirect to={{ pathname: '/user/login', search: `?from=${rest.path}` }} />)
      }
    />
  )
}

const InjectedPrivateRoute = withRouter(inject((stores) => {
  return {
    appState: stores.appState,
  }
})(observer(PrivateRoute)))

PrivateRoute.propTypes = {
  appState: PropTypes.object,
  component: PropTypes.element.isRequired,
}

export default () => [
  <Route path="/" component={() => <Redirect to="/index" />} exact key="first" />,
  <Route path="/index" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={ToppicDetail} key="detail" />,
  <Route path="/user/login" exact component={UserLogin} key="login" />,
  <InjectedPrivateRoute path="/user/info" exact component={UserInfo} key="info" />,
  <InjectedPrivateRoute path="/topic/create" exact component={TopicCreate} key="create" />,
  <Route path="/test" component={TestApi} key="test" />,
]
