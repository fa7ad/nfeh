import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { View } from 'react-desktop/macOs'
import { lazyload } from 'react-lazyload'
import Image from 'legit-image'

import fileURL from 'file-url'
import cx from 'classnames'

import style from './_pictureItem'

@observer
@lazyload({
  height: '100%',
  once: true,
  scroll: true
})
class PictureItem extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
  }

  render () {
    const { index, location, active } = this.props
    const viewClass = cx(style.pictureItem, {
      [`${style.activeItem}`]: active
    })

    return (
      <View
        className={viewClass}
        horizontalAlignment='center'
        verticalAlignment='center'
        onClick={this._selectMe} >
        <Image
          speed={0.1}
          src={fileURL(location)}
          alt={`image-${index}`} />
      </View>
    )
  }

  componentDidMount () {
    if (this.props.active) {
      this.store.selectedImagePath = this.props.location
    }
  }

  _selectMe = ev => {
    this.store.selectedImage = this.props.index
    this.store.selectedImagePath = this.props.location
  }

  static propTypes = {
    index: React.PropTypes.any.isRequired,
    active: React.PropTypes.bool.isRequired,
    store: React.PropTypes.object.isRequired,
    location: React.PropTypes.string.isRequired
  }
}

export default PictureItem
