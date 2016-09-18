import React, { Component } from 'react'
import { Box, View } from 'react-desktop/macOs'
import { observer } from 'mobx-react'

import style from './_picturesFrame'

@observer
class PicturesFrame extends Component {
  render () {
    return (
      <View
        layout='horizontal'
        verticalAlignment='left'
        horizontalAlignment='center'
        className={style.picturesFrame}>
        <Box label='Choose...'>
          <p>lorem ips</p>
        </Box>
      </View>
    )
  }
}

export default PicturesFrame
