import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <main className='flex-1 min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50'>
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout