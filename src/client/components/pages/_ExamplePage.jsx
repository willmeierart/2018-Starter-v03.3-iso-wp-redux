import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { binder } from '../../utils'
import { fetchWPpages } from '../../../_redux/actions'

class UsersListPage extends Component {
  constructor(props) {
    super(props)
    binder(this,['renderChapters'])
  }
  componentDidMount(){
    this.props.fetchUsers()
  }
  renderPages(){
    return this.props.users.map(user=>{
      return (<li key={user.id}>{user.name}</li>)
    })
  }
  renderChapters(){
    let pages = this.props.WPdata.allPages
    pages = pages.sort((a,b)=>{return a.id - b.id})
    return pages.map(pageData=>{
      const {id} = pageData
      return (
        <li key={id} onClick={()=>window.scrollTo(0, 0)}>
          {pageData.title.rendered}
        </li>
      )
    })
  }

  head(){
    return (
      <Helmet>
        <title>{`${this.props.WPdata.allPages.length} Pages`}</title>
        <meta property="og:title" content="Test Page"/>
      </Helmet>
    )
  }

  render(){
    return (
      <div>
        {this.head()}
        <ul>{ this.renderChapters() }</ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {WPdata:state.WPdata}
}

function loadData(store){
  return store.dispatch(fetchWPpages())
}

export default {
  component: connect(mapStateToProps, {fetchWPpages})(UsersListPage),
  loadData
}
