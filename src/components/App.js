import React, { Component } from 'react'
import { Window, TitleBar, View } from 'react-desktop/macOs'

import DirectoryFrame from './DirectoryFrame'
import PicturesFrame from './PicturesFrame'

import style from './_app'

class App extends Component {
  render () {
    const {remote} = this.props
    const win = remote.getCurrentWindow()

    return (
      <Window height='100vh' padding='5px'>
        <TitleBar
          title='nFeh'
          controls
          onCloseClick={() => win.close()}
          onMinimizeClick={() => win.minimize()}
          id='titlebar' />
        <View layout='vertical' className={style.rootView}>
          <DirectoryFrame remote={remote} store={this.props.store} />
          <PicturesFrame />
        </View>
      </Window>
    )
  }
}

export default App
