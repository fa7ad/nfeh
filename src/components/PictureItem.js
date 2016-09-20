import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { View } from 'react-desktop/macOs'
import Image from 'legit-image'

import fileURL from 'file-url'
import cx from 'classnames'

import style from './_pictureItem'

@observer
class PictureItem extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
  }

  render () {
    const { idx, location, active } = this.props

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
          src={fileURL(location)}
          alt={`image-${idx}`} />
      </View>
    )
  }

  _selectMe = ev => {
    this.store.selectedImage = this.props.idx
    return false
  }

  static propTypes = {
    idx: React.PropTypes.any.isRequired,
    active: React.PropTypes.bool.isRequired,
    store: React.PropTypes.object.isRequired,
    location: React.PropTypes.string.isRequired
  }
}

export default PictureItem
