import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list'
import ToppicDetail from '../views/topic-detail'
import UserLogin from '../views/user/login'

import TestApi from '../views/test/api.test'

export default () => [
  <Route path="/" component={() => <Redirect to="/index" />} exact key="first" />,
  <Route path="/index" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={ToppicDetail} key="detail" />,
  <Route path="/user/login" component={UserLogin} key="login" />,
  <Route path="/test" component={TestApi} key="test" />,
]
