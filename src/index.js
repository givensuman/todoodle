import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'
import Loading from './views/Loading'

import StoreProvider, { StoreContext } from './utils/store'

const App = () => {

  const { user, lists } = useContext(StoreContext)

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Navigate replace to='/' />} />
        <Route path='/' element={
          !user.state ? <Login /> :
            !lists.state ? <Loading /> :
              <Home />
        } />
      </Routes>
    </Router>
  )
}
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)
