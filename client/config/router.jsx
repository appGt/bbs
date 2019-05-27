import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list'
import ToppicDetail from '../views/topic-detail'

export default () => [
  <Route path="/" component={() => <Redirect to="/list" />} exact key="1" />,
  <Route path="/list" component={TopicList} key="2" />,
  <Route path="/detail" component={ToppicDetail} key="3" />,
]
