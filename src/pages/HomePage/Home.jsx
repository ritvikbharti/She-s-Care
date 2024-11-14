import React from 'react'
import Navbar from '../../components/Navbar'
import ProfileSection from '../../components/ProfileSection'
import Dashboard from '../DashboardPage/Dashboard'
export default function Home() {
  return (
    <>
        <Navbar/>
    <div className='h-screen bg-regal_blue flex justify-end'>
            <Dashboard/>
        <ProfileSection/>
      </div>
    </>
      )
}
