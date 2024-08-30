import React from 'react'
import LeftSidebar from './LeftSidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <main className='w-full flex'>
        <LeftSidebar/>
        <section className='flex h-full w-full justify-center items-center'>
            <Outlet />
        </section>
    </main>
  )
}

export default RootLayout