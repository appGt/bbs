import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue, pink } from '@material-ui/core/colors'
import App from './views/app';
import { AppState, TopicStore } from './store/store'

const initialState = window.__INITIAL__STATE__ || {} //eslint-disable-line
const theme = createMuiTheme({
  palette: {
    primary: pink,
    accent: lightBlue,
    type: 'light',
  },
})

const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.appState)

const root = document.getElementById('root');
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Component />
          </ThemeProvider>
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
