import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list'
import ToppicDetail from '../views/topic-detail'
import TestApi from '../views/test/api.test'

export default () => [
  <Route path="/" component={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={ToppicDetail} key="detail" />,
  <Route path="/test" component={TestApi} key="test" />,
]
