import _ from 'lodash'
import pify from 'pify'
import nGlob from 'glob'
import sizeOf from 'image-size'
import { join as paths } from 'path'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ProgressCircle, View } from 'react-desktop/macOs'

import PictureItem from './PictureItem'
import NoImagesFound from './NoImagesFound'

import style from './_picturesView'

const glob = pify(nGlob)

const aspectOf = image => {
  const { width, height } = sizeOf(image)
  return width / height
}

const LoadingCircle = <ProgressCircle size={25} className={style.loadingCircle} />

@observer
class PicturesView extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
    this.state = {
      images: []
    }
  }

  render () {
    return (
      <View
        layout='horizontal'
        verticalAlignment='right'
        horizontalAlignment='center'
        className={style.picturesView}>
        {this.state.images.length > 0 ? this.state.images : LoadingCircle}
      </View>
    )
  }

  componentDidMount = this.updateImages
  componentDidUpdate = this.updateImages

  updateImages () {
    glob(paths(this.store.directory, '**/*.{png,jpg,jepg}'))
      .then(data => {
        if (data.length === 0) throw new Error('404')
        return data
      })
      .then(imgs => {
        const images = _.map(_.orderBy(imgs, [it => aspectOf(it)], ['desc']),
          (image, idx) => (
            <PictureItem
              index={idx}
              store={this.store}
              location={image}
              active={(this.store.selectedImage === idx)}
            />
          )
        )
        this.setState({images})
      })
      .catch(err => {
        if (err.message === '404') this.setState({images: [<NoImagesFound />]})
        console.log(err.toString(), this.state)
      })
  }

  static propTypes = {
    store: React.PropTypes.object.isRequired
  }
}

export default PicturesView
