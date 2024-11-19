import React from 'react'
import Navbar from '../../components/Navbar'
import ProfileSection from '../../components/ProfileSection'
import Dashboard from '../DashboardPage/Dashboard'
export default function Home() {
  return (
    <>
        <Navbar/>    
            <Dashboard/>
        <ProfileSection/>
    </>
      )
}
