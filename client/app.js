import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './views/app';

const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <AppContainer>
        <Component />
      </AppContainer>
    </BrowserRouter>,
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
