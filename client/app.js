import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import App from './app.jsx';

const root = document.getElementById('root');
const render = Component => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
}

render(App)

ReactDom.render(<App />, document.getElementById('root'))
if (module.hot) {
  module.hot.accept('./app.jsx', () => { 
    console.log('hot loader')
    const NextApp = require('./app.jsx').default;
    // ReactDom.render(<NextApp />, document.getElementById('root'))
    render(NextApp);
  })
}