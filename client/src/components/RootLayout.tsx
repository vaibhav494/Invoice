import React from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const RootLayout = () => {
  return (
    <div className='flex h-screen w-screen bg-gray-100'>
      <Sidebar />
      <main className='flex-1 overflow-auto'>
        <Navbar />
        <section className='p-6'>
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default RootLayout