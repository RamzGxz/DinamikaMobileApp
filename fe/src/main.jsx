import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import '../src/styles/css/bootstrap.min.css'
import '../src/styles/js/bootstrap.bundle.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
