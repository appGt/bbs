import React from 'react'
import Routes from '../config/router'
import AppBar from './layout/app-bar'

export default class App extends React.Component {
  componentWillMount() {

  }

  render() {
    return [
      <AppBar key="1" />,
      <Routes key="2" />,
    ]
  }
}
