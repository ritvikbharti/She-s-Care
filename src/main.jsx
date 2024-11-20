import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import HomeLayout from './Layouts/HomeLayout.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    children: []
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
