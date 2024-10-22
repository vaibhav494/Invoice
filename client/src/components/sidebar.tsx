import { useState, useEffect } from 'react'
import { HomeIcon, FileTextIcon, ShoppingBagIcon, BuildingIcon, BarChartIcon ,SquareChartGantt} from 'lucide-react'
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
    { href: '/product-cost', text: 'Product Cost', icon: SquareChartGantt },
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
