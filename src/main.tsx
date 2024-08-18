import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Zilly from './Zilly.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Zilly/>
    </BrowserRouter>
  </React.StrictMode>,
)

