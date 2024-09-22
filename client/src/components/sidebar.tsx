// import { HomeIcon, FileTextIcon, ShoppingBagIcon, ReceiptIcon, MessageSquareIcon, CreditCardIcon } from 'lucide-react'

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-[#0A3A2A] text-white p-6">
//       <h1 className="text-2xl font-bold mb-10">
//         <a href="/"><span className="text-[#ADFF2F]">Vaibhav</span>App</a>
        
//       </h1>
//       <nav className="space-y-6">
//         <a href="/" className="flex items-center space-x-2 text-[#ADFF2F]">
//           <HomeIcon className="w-6 h-6" />
//           <span>Dashboard</span>
//         </a>
//         <a href="/bill_detail" className="flex items-center space-x-2 text-gray-300 hover:text-white">
//           <FileTextIcon className="w-6 h-6" />
//           <span>View Invoices</span>
//         </a>
//         <a href="/other-expense" className="flex items-center space-x-2 text-gray-300 hover:text-white">
//           <ShoppingBagIcon className="w-6 h-6" />
//           <span>Other Expense</span>
//         </a>
//         <a href="/add-bank-detail" className="flex items-center space-x-2 text-gray-300 hover:text-white">
//           <ReceiptIcon className="w-6 h-6" />
//           <span>Bank Detail</span>
//         </a>
//         <a href="/chart" className="flex items-center space-x-2 text-gray-300 hover:text-white">
//           <MessageSquareIcon className="w-6 h-6" />
//           <span>Chart</span>
//         </a>
//         <a href="/customer" className="flex items-center space-x-2 text-gray-300 hover:text-white">
//           <CreditCardIcon className="w-6 h-6" />
//           <span>Customer</span>
//         </a>
//         <a href="/invoice" className="flex items-center space-x-2 text-gray-300 hover:text-white">
//           <CreditCardIcon className="w-6 h-6" />
//           <span>Generate Invoice</span>
//         </a>
//       </nav>
//     </aside>
//   )
// }import React, { useState } from 'react'
// import React, { useEffect, useState } from 'react'
// import { HomeIcon, FileTextIcon, ShoppingBagIcon, BuildingIcon, BarChartIcon, UsersIcon, FileIcon } from 'lucide-react'
// import { Link, useLocation } from 'react-router-dom'

// export default function Sidebar() {
//   const location = useLocation()
//   const [activeLink, setActiveLink] = useState(location.pathname)

//   const menuItems = [
//     { href: '/', text: 'Dashboard', icon: HomeIcon },
//     { href: '/bill_detail', text: 'View Invoices', icon: FileTextIcon },
//     { href: '/other-expense', text: 'Other Expense', icon: ShoppingBagIcon },
//     { href: '/add-bank-detail', text: 'Bank Detail', icon: BuildingIcon },
//     { href: '/chart', text: 'Chart', icon: BarChartIcon },
//     { href: '/customer', text: 'Customer', icon: UsersIcon },
//     { href: '/invoice', text: 'Generate Invoice', icon: FileIcon },
//   ]
//   useEffect(() => {
//     setActiveLink(location.pathname)
//   }, [location.pathname])


//   const handleLinkClick = (href: string) => {
//     setActiveLink(href)
//   }

//   return (
//     <aside className="w-64 bg-[#0A3A2A] text-white p-6">
//       <h1 className="text-2xl font-bold mb-10">
//         <Link to="/" onClick={() => handleLinkClick('/')}>
//           <span className="text-[#ADFF2F]">Vaibhav</span>App
//         </Link>
//       </h1>
//       <nav className="space-y-6">
//         {menuItems.map((item) => {
//           const isActive = activeLink === item.href
//           return (
//             <Link
//               key={item.href}
//               to={item.href}
//               className={`flex items-center space-x-2 ${
//                 isActive ? 'text-[#ADFF2F]' : 'text-gray-300 hover:text-white'
//               }`}
//               onClick={() => handleLinkClick(item.href)}
//             >
//               <item.icon className="w-6 h-6" />
//               <span>{item.text}</span>
//             </Link>
//           )
//         })}
//       </nav>
//     </aside>
//   )
// }
import React, { useState, useEffect } from 'react'
import { HomeIcon, FileTextIcon, ShoppingBagIcon, BuildingIcon, BarChartIcon, UsersIcon, FileIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  const [activeLink, setActiveLink] = useState(location.pathname)

  // Update active link when location changes (e.g., manual URL change)
  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location.pathname])

  const menuItems = [
    { href: '/', text: 'Dashboard', icon: HomeIcon },
    { href: '/bill_detail', text: 'View Invoices', icon: FileTextIcon },
    { href: '/other-expense', text: 'Other Expense', icon: ShoppingBagIcon },
    { href: '/add-bank-detail', text: 'Bank Detail', icon: BuildingIcon },
    { href: '/chart', text: 'Chart', icon: BarChartIcon },
    // { href: '/customer', text: 'Customer', icon: UsersIcon },
    // { href: '/invoice', text: 'Generate Invoice', icon: FileIcon },
  ]

  return (
    <aside className="w-64 bg-[#0A3A2A] text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        <Link to="/" onClick={() => setActiveLink('/')}>
          <span className="text-[#ADFF2F]">Ledger</span>Dary
        </Link>
      </h1>
      <nav className="space-y-6">
        {menuItems.map((item) => {
          const isActive = activeLink === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-2 ${
                isActive ? 'text-[#ADFF2F]' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveLink(item.href)}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.text}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
