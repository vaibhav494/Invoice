import { HomeIcon, FileTextIcon, ShoppingBagIcon, ReceiptIcon, MessageSquareIcon, CreditCardIcon } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0A3A2A] text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        <span className="text-[#ADFF2F]">Vaibhav</span>App
      </h1>
      <nav className="space-y-6">
        <a href="#" className="flex items-center space-x-2 text-[#ADFF2F]">
          <HomeIcon className="w-6 h-6" />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <FileTextIcon className="w-6 h-6" />
          <span>Invoices</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <ShoppingBagIcon className="w-6 h-6" />
          <span>Shops</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <ReceiptIcon className="w-6 h-6" />
          <span>Receipts</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <MessageSquareIcon className="w-6 h-6" />
          <span>Chat</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <CreditCardIcon className="w-6 h-6" />
          <span>Payments</span>
        </a>
      </nav>
    </aside>
  )
}
