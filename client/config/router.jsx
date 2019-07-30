import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list'
import ToppicDetail from '../views/topic-detail'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'
import TopicCreate from '../views/topic-create'

import TestApi from '../views/test/api.test'

export default () => [
  <Route path="/" component={() => <Redirect to="/index" />} exact key="first" />,
  <Route path="/index" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={ToppicDetail} key="detail" />,
  <Route path="/user/login" exact component={UserLogin} key="login" />,
  <Route path="/user/info" exact component={UserInfo} key="info" />,
  <Route path="/topic/create" exact component={TopicCreate} key="create" />,
  <Route path="/test" component={TestApi} key="test" />,
]
