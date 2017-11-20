import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

export default [
  {
    ...HomePage,
    path:'/',
    exact: true
  },
  {
    ...NotFoundPage,
    path:''
  }
]
