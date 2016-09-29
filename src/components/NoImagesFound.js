import React, { Component } from 'react'
import { FaInfoCircle as InfoIcon } from 'react-icons/lib/fa'
import { Text, View } from 'react-desktop/macOs'

import style from './_noImagesFound'

class NoImagesFound extends Component {
  render () {
    return (
      <View layout='vertical' horizontalAlignment='center'>
        <InfoIcon className={style.infoIcon} />
        <Text>No images found in the selected directory.</Text>
      </View>
    )
  }
}

export default NoImagesFound
