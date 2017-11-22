import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './architecture/Header.jsx'
import Footer from './architecture/Footer.jsx'

const App = ({ route })=>{
  console.log(route);
  return (
    <div>
      <Header/>
      { renderRoutes(route.routes) }
      <Footer/>
    </div>
  )
}

export default {
  component: App
}
