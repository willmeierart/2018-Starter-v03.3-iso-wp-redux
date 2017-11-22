import App from './components/App.jsx'
import HomePage from './components/pages/HomePage.jsx'
import NotFoundPage from './components/pages/NotFoundPage.jsx'

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        exact:true,
        path:'/'
      },
      {
        ...NotFoundPage,
        path:''
      }
    ]
  }
]
