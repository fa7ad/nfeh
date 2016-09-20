import React, { Component } from 'react'
import { Window, TitleBar, View } from 'react-desktop/macOs'

import DirectoryFrame from './DirectoryFrame'
import PicturesFrame from './PicturesFrame'

import style from './_app'

class App extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
    this.remote = props.remote
  }

  render () {
    const win = this.remote.getCurrentWindow()

    return (
      <Window height='100vh' padding='5px'>
        <TitleBar
          title='nFeh'
          controls
          onCloseClick={() => win.close()}
          onMinimizeClick={() => win.minimize()}
          className={style.titleBar} />
        <View
          layout='vertical'
          className={style.rootView}>
          <DirectoryFrame remote={this.remote} store={this.store} />
          <PicturesFrame store={this.store} />
        </View>
      </Window>
    )
  }

  static propTypes = {
    store: React.PropTypes.object.isRequired,
    remote: React.PropTypes.object.isRequired
  }
}

export default App
