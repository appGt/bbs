import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './views/app';
import AppState from './store/app-state'

const initialState = window.__INITIAL__STATE__ || {} //eslint-disable-line

const root = document.getElementById('root');
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App)

// ReactDOM.render(<App />, document.getElementById('root'))
if (module.hot) {
  module.hot.accept('./views/app', () => {
    const NextApp = require('./views/app').default; //eslint-disable-line
    // ReactDOM.render(<NextApp />, document.getElementById('root'))
    render(NextApp);
  })
}
