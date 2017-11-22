import React from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import Header from './architecture/Header.jsx'
import Footer from './architecture/Footer.jsx'

const App = ({ route }) =>
  (
    <div>
      <Header/>
      { renderRoutes(route.routes) }
      <Footer/>
    </div>
  )

export default {
  component: App,
}

App.propTypes = {
  route: PropTypes.array.isRequired,
}
