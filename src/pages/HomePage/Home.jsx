import React from 'react'
import Navbar from '../../Layouts/PageLayout/navbar'
// import 
export default function Home() {
  return (
      <div className='h-screen bg-primary_dark'>
        <div className='h-[500px]   absolute left-5 top-20 w-[70px] bg-primary_hard rounded-xl flex float-left'>
            <Navbar/>
        </div>
        <div className='h-md w-5/6 bg-white float-right'>

        </div>
      </div>
  )
}
