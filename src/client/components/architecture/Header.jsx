import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props){
  return (
    <div className='header'>
      <Link to="/" className='title'></Link>
    </div>
  )
}
