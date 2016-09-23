import _ from 'lodash'
import sizeOf from 'image-size'
import { sync as find } from 'glob'
import { join as paths } from 'path'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { FaInfoCircle as InfoIcon } from 'react-icons/lib/fa'
import { ProgressCircle, Text, View } from 'react-desktop/macOs'

import PictureItem from './PictureItem'
import style from './_picturesView'

@observer
class PicturesView extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
  }

  render () {
    const images = find(paths(this.store.directory, '**/*.{jpg,png,jpeg}'))

    let renderables = [
      <ProgressCircle size={25} />
    ]

    if (images.length >= 1) {
      renderables = _.sortBy(images, [it => {
        const {width, height} = sizeOf(it)
        return (height / width)
      }]).map((image, idx) => (
        <PictureItem
          idx={idx}
          store={this.store}
          location={image}
          active={(this.store.selectedImage === idx)} />
      ))
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
        verticalAlignment='right'
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
