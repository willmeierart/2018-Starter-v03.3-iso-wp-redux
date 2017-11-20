import React, {Component} from 'react'
import {binder} from '../../utils'

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = { menuOpen:false }
    binder(this,['openMenu'])
  }
  openMenu(){
    this.setState({menuOpen:this.state.menuOpen?false:true})
  }
  render() {
    return (
      <div className='menu'></div>
    )
  }
}
