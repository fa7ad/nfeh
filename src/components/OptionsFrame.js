import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Dropdown from 'react-dropdown'
import wallpaper from '@fa7ad/wallpaper';
import { View, Button } from 'react-desktop/macOs'
import {
  FaWrench,
  FaCheck,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/lib/fa'

import style from './_optionsFrame'
import 'react-dropdown/style.css'
import './_DropdownStyle.css'


@observer
class OptionsFrame extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
    this.state = {
      icon: <FaWrench />,
    }
  }

  render () {
    return (
      <View
        layout='horizontal'
        verticalAlignment='center'
        className={style.optionsFrame} >
        <Button
          onClick={this._applyWallpaper}
          color='blue'>
          {this.state.icon} Apply
        </Button>
      </View>
    )
  }

  _selectFill = (mode) => {
    this.setState({ mode })
    this.store.fillMode = mode.value
  }

  _applyWallpaper = () => {
    this.setState({
      icon: <FaSpinner className={style.spinAround} />
    })
    wallpaper
      .set(this.store.selectedImagePath)
      .then(() => {
        this.setState({
          icon: <FaCheck />
        })
        setTimeout(() => {
          this.setState({
            icon: <FaWrench />
          })
        }, 1500)
      })
  }
}

export default OptionsFrame
