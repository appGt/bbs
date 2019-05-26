import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list'
import ToppicDetail from '../views/topic-detail'

export default () => [
  <Route path="/" component={() => <Redirect to="/list" />} exact />,
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={ToppicDetail} />,
]
