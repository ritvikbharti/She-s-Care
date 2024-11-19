import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/HomePage/Home'
import { Router, Route, Routes } from 'react-router-dom'
import Test from './pages/TestPage/Test'
import Doctor from './pages/DoctorPage/Doctor'
import Product from './pages/ProductPage/Product'
import Order from './pages/OrderPage/Order'
import Dashboard from './pages/DashboardPage/Dashboard'
import Chatbot from './pages/chatbot/Chatbot'
// rfc
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/doctor' element={<Doctor/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/chat' element={<Chatbot/>}/>
    </Routes>  
  ) 
}

export default App
