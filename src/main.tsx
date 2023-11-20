import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {reportWebVitals} from './reportWebVitals.ts'
import {sendToVercelAnalytics} from './vitals.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

reportWebVitals(sendToVercelAnalytics)
