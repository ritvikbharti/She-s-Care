import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/HomePage/Home'
import { Router, Route, Routes } from 'react-router-dom'

// rfc

function App() {
  const [count, setCount] = useState(0)
  const chatkey = import.meta.env.VITE_CHAT_API_KEY;
  console.log(chatkey);

  return (
    <></> 
  ) 
}

export default App
