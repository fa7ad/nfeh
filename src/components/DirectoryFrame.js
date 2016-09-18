import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Text, View, Button } from 'react-desktop/macOs'
import { MdCloudDownload as DownloadIcon } from 'react-icons/lib/md'

import style from './_directoryFrame'

@observer
class DirectoryFrame extends Component {
  render () {
    const { store } = this.props
    return (
      <View
        layout='horizontal'
        verticalAlignment='center'
        horizontalAlignment='center'
        className={style.directoryFrame} >
        <Button onClick={this._chooseDir}>
          <DownloadIcon /> Choose folder
        </Button>
        <Text padding='0 5px'>
          {store.directory}
        </Text>
      </View>
    )
  }

  _chooseDir = () => {
    const {remote, store} = this.props
    const path = remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (path) store.directory = path[0]
  }
}

export default DirectoryFrame
