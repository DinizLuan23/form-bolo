import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Styles
import './app.css';
import 'react-toastify/dist/ReactToastify.css';

// Components
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>,
)
