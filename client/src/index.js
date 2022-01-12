import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Home from './views/Home'
import Login from './views/Login'

const App = () =>
  <Router>
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/' element={<Login />} />
    </Routes>
  </Router>

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
