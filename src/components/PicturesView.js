import React, { Component } from 'react'
import { ProgressCircle, Text, View } from 'react-desktop/macOs'
import { FaInfoCircle as InfoIcon } from 'react-icons/lib/fa'
import { observer } from 'mobx-react'
import { sync as find } from 'glob'
import fileURL from 'file-url'

import style from './_picturesView'

@observer
class PicturesView extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
  }

  render () {
    const images = find(this.store.directory + '/**/*.jpg')
    let renderables = [<ProgressCircle size={25} />]

    if (images.length >= 1) {
      renderables = images.map(image => <span>{fileURL(image)}</span>)
    } else {
      renderables = [
        <View layout='vertical' horizontalAlignment='center'>
          <InfoIcon className={style.infoIcon} />
          <Text>No images found in the selected directory.</Text>
        </View>
      ]
    }

    return (
      <View
        layout='horizontal'
        verticalAlignment='left'
        horizontalAlignment='center'
        className={style.picturesView}>
        {renderables}
      </View>
    )
  }

  static propTypes = {
    store: React.PropTypes.object.isRequired
  }
}

export default PicturesView
