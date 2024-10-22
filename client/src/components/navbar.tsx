import { Bell } from 'lucide-react'; 
import { UserButton } from '@clerk/clerk-react'; 
import { Link, useLocation } from 'react-router-dom'; 

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="bg-white container mx-auto p-4 pl-0 mr-2 shadow-lg ">
      <header className="flex items-center justify-between ">
        <div className="flex items-center space-x-8">

          <nav>
            <ul className="flex space-x-4 pl-5">
              <li>
                <Link
                  to="/invoice"
                  className={`${
                    location.pathname === '/invoice'
                      ? 'text-[#0A3A2A] border-b-2 border-[#0A3A2A] pb-1 font-bold'
                      : 'text-black'
                  }`}
                >
                  Generate Invoice
                </Link>
              </li>
              <li>
                <Link
                  to="/customer"
                  className={`${
                    location.pathname === '/customer'
                      ? 'text-[#0A3A2A] border-b-2 border-[#0A3A2A] pb-1 font-bold'
                      : 'text-black'
                  }`}
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  to="/supplier"
                  className={`${
                    location.pathname === '/supplier'
                      ? 'text-[#0A3A2A] border-b-2 border-[#0A3A2A] pb-1 font-bold'
                      : 'text-black'
                  }`}
                >
                  Supplier
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 text-white" />
          <UserButton />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
