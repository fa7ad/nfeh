import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import Store from './Store'

ReactDOM.render(
  <App store={new Store()} remote={require('electron').remote} />,
  document.querySelector('#root')
)
