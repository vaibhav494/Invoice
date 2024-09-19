import { ArrowDownIcon, ArrowUpIcon, ArchiveIcon, DownloadIcon, BarChartIcon, TrendingUpIcon, SquareArrowOutUpRight } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function Dash() {
  const navigate = useNavigate();  // Initialize the navigate function at the top level
  const { user } = useUser();

  // Function to handle redirection
  function redirectSavedInvoices() {
    navigate('/bill_detail');  // Programmatically navigate to the '/bill_detail' route
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold">Hello, {user?.firstName} {user?.lastName}</h2>
          <p className="text-gray-600">Your current sales summary and activity.</p>
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-white rounded-md shadow">
            <a href="/chart">
            <span className="flex items-center">
              <BarChartIcon className="w-5 h-5 mr-2" />
              Graphical View
            </span>
            </a>
            
          </button>
          <button className="px-4 py-2 bg-white rounded-md shadow">
            <span className="flex items-center">
              <TrendingUpIcon className="w-5 h-5 mr-2" />
              Trends
            </span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-10">
        {[
          { title: "Today's revenue", amount: "KES 2,837.90", change: 10, changeType: 'increase' },
          { title: "Today's expenses", amount: "KES 25,938.86", change: 6, changeType: 'decrease' },
          { title: "Overdue Invoices", amount: "KES 6,947.00", badge: "2 New" },
          { title: "Upcoming Payments", amount: "KES 6,947.00", badge: "9 New" },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 mb-2">{item.title}</h3>
            <p className="text-2xl font-bold mb-2">{item.amount}</p>
            {item.change && (
              <p className={`flex items-center ${item.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {item.changeType === 'increase' ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
                {item.change}%
              </p>
            )}
            {item.badge && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <div className='flex justify-between items-center mb-4'>
            <h3 className="text-xl font-bold">Invoices</h3>
            <SquareArrowOutUpRight className="w-5 h-5 text-gray-700" onClick={redirectSavedInvoices}/>
          </div>
          <p className="text-gray-500 mb-4">This data is reported once at 0700hrs local time every day</p>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-2">Invoice ID</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Company</th>
                <th className="pb-2">Action</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'INV-U7263', status: 'Paid', company: 'Maxfter Inc.' },
                { id: 'INV-U7264', status: 'Refunded', company: 'Meta Inc.' },
                { id: 'INV-U7265', status: 'Paid', company: 'Linkedin Inc.' },
                { id: 'INV-U7266', status: 'Paid', company: 'Maihsy LLP' },
                { id: 'INV-U7267', status: 'Paid', company: 'Bima Traders' },
                { id: 'INV-U7268', status: 'Paid', company: 'Mata Corp' },
                { id: 'INV-U7269', status: 'Paid', company: 'ColorPixels' },
              ].map((invoice) => (
                <tr key={invoice.id} className="border-b">
                  <td className="py-2">{invoice.id}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-2">{invoice.company}</td>
                  <td className="py-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <ArchiveIcon className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="py-2">
                    <button className="text-green-600 hover:text-green-700">
                      <DownloadIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
          <p className="text-gray-500 mb-4">Updated 20 mins ago</p>
          <ul className="space-y-4">
            {[
              { company: 'Bima Traders', amount: '+ KES 38,948.00', time: 'Wednesday 1:00pm' },
              { company: 'Meta Corp', amount: '- KES 450.00', time: 'Wednesday 2:34pm' },
              { company: 'Maxfter Inc.', amount: '+ KES 2,483.00', time: 'Thursday 3:55pm' },
              { company: 'Linkedin Inc.', amount: '+ KES 3,728.00', time: 'Thursday 6:00pm' },
              { company: 'Maihsy LLP', amount: '+ KES 2,726.00', time: 'Friday 7:00pm' },
            ].map((transaction, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.company}</p>
                  <p className={`text-sm ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount}
                  </p>
                </div>
                <p className="text-gray-500 text-sm">{transaction.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
