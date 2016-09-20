import React, { Component } from 'react'
import { Box, View } from 'react-desktop/macOs'
import { observer } from 'mobx-react'

import PicturesView from './PicturesView'
import style from './_picturesFrame'

@observer
class PicturesFrame extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
  }

  render () {
    return (
      <View
        layout='vertical'
        verticalAlignment='left'
        horizontalAlignment='center'
        className={style.picturesFrame}>
        <Box
          label='Select wallpaper'
          className={style.boxContainer}>
          <PicturesView store={this.props.store} />
        </Box>
      </View>
    )
  }

  static propTypes = {
    store: React.PropTypes.object.isRequired
  }
}

export default PicturesFrame
