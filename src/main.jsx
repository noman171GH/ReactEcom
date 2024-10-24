import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { MyStore } from './redux/Store.js'
import  {Provider}  from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={MyStore} >
    <App /> 
  </Provider>
)
