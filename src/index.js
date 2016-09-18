import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import Store from './Store'

const noreq = window.require

ReactDOM.render(
  <App store={new Store()} remote={noreq('electron').remote} />,
  document.querySelector('#root')
)
