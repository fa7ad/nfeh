import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Dropdown from 'react-dropdown'
import { exec } from 'child_process'
import sh from 'shell-escape-tag'
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

const launch = function (command) {
  return new Promise((resolve, reject) => {
    const child = exec(command)
    child.addListener('error', reject)
    child.addListener('exit', resolve)
  })
}

@observer
class OptionsFrame extends Component {
  constructor (props) {
    super(props)
    this.store = props.store
    this.state = {
      icon: <FaWrench />
    }
  }

  render () {
    const fillOptions = [
      { value: 'bg-fill', label: 'Scale + Maintain ratio' },
      { value: 'bg-scale', label: 'Scale' },
      { value: 'bg-seamless', label: 'Seamless Borders' },
      { value: 'bg-tile', label: 'Tiled' },
      { value: 'bg-center', label: 'Centered' }
    ]

    return (
      <View
        layout='horizontal'
        verticalAlignment='center'
        className={style.optionsFrame} >
        <Dropdown
          options={fillOptions}
          value={fillOptions[0]}
          onChange={this._selectFill}
          placeholder='Select a fill method...' />
        <Button
          onClick={this._doFeh}
          color='blue'>
          {this.state.icon} Apply
        </Button>
      </View>
    )
  }

  _selectFill = ({value}) => {
    this.store.fillMode = value
  }

  _doFeh = () => {
    this.setState({
      icon: <FaSpinner className={style.spinAround} />
    })
    launch(sh`feh --${this.store.fillMode} ${this.store.selectedImagePath}`)
      .then(() => {
        this.setState({
          icon: <FaCheck />
        })
        setTimeout(() => this.setState({icon: <FaWrench />}), 500)
      })
      .catch(e => {
        this.setState({
          icon: <FaExclamationTriangle />
        })
        setTimeout(() => this.setState({icon: <FaWrench />}), 500)
      })
  }

  static propTypes = {
    store: React.PropTypes.object.isRequired
  }
}

export default OptionsFrame
