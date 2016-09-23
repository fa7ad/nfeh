import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Text, View, Button } from 'react-desktop/macOs'
import { MdCloudDownload as DownloadIcon } from 'react-icons/lib/md'

import style from './_directoryFrame'

const path = require('path')

@observer
class DirectoryFrame extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
  }

  render () {
    return (
      <View
        layout='horizontal'
        verticalAlignment='left'
        className={style.directoryFrame} >
        <Button
          onClick={this._chooseDir}
          className={style.dirButton}>
          <DownloadIcon /> Choose folder
        </Button>
        <Text padding='0 5px'>
          {this.store.directory}
        </Text>
      </View>
    )
  }

  _chooseDir = () => {
    const { remote } = this.props

    const folder = remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (folder) this.store.directory = path.resolve(folder[0])
  }

  static propTypes = {
    store: React.PropTypes.object.isRequired,
    remote: React.PropTypes.object.isRequired
  }
}

export default DirectoryFrame
