import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import App from './app.jsx';

const root = document.getElementById('root');
const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
}

render(App)

// ReactDOM.render(<App />, document.getElementById('root'))
if (module.hot) {
  module.hot.accept('./app.jsx', () => { 
    console.log('hot loader')
    const NextApp = require('./app.jsx').default;
    // ReactDOM.render(<NextApp />, document.getElementById('root'))
    render(NextApp);
  })
}