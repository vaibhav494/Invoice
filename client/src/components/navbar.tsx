import { UserButton } from "@clerk/clerk-react";
import { Bell } from "lucide-react";

export const Navbar = () => {
  return (
    // <div className="navbar bg-red-100">
    //   <div className="navbar-start">
    //     <div className="dropdown">
    //       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M4 6h16M4 12h8m-8 6h16"
    //           />
    //         </svg>
    //       </div>
    //       <ul
    //         tabIndex={0}
    //         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    //       >
    //         <li>
    //           <a>Item 1</a>
    //         </li>
    //         <li>
    //           <a>Parent</a>
    //           <ul className="p-2">
    //             <li>
    //               <a>Submenu 1</a>
    //             </li>
    //             <li>
    //               <a>Submenu 2</a>
    //             </li>
    //           </ul>
    //         </li>
    //         <li>
    //           <a>Item 3</a>
    //         </li>
    //       </ul>
    //     </div>
    //     <a className="btn btn-ghost text-xl">ENVOICE</a>
    //   </div>
    //   <div className="navbar-center hidden lg:flex">
    //     <ul className="menu menu-horizontal px-1">
    //       <li>
    //         <a>Item 1</a>
    //       </li>
    //       <li>
    //         <details>
    //           <summary>Parent</summary>
    //           <ul className="p-2">
    //             <li>
    //               <a>Submenu 1</a>
    //             </li>
    //             <li>
    //               <a>Submenu 2</a>
    //             </li>
    //           </ul>
    //         </details>
    //       </li>
    //       <li>
    //         <a>Item 3</a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="navbar-end">
    //   <button className="btn btn-ghost btn-circle">
    //   <div className="indicator">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-5 w-5"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor">
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    //     </svg>
    //     <span className="badge badge-xs badge-primary indicator-item"></span>
    //   </div>
    // </button>
    //   <div className="dropdown dropdown-end">
    //   <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    //     <div className="w-10 rounded-full">
    //       <img
    //         alt="Tailwind CSS Navbar component"
    //         src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    //     </div>
    //   </div>
    //   <ul
    //     tabIndex={0}
    //     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
    //     <li>
    //       <a className="justify-between">
    //         Profile
    //         <span className="badge">New</span>
    //       </a>
    //     </li>
    //     <li><a>Settings</a></li>
    //     <li><a>Logout</a></li>
    //   </ul>
    // </div>
    //   </div>
    // </div>
    <div className="container mx-auto p-4 pl-0 mr-2">
    <header className="flex items-center justify-between ">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold"></h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-[#0A3A2A] border-b-2 border-[#0A3A2A] pb-1">Invoices</a></li>
              <li><a href="/customer" className="text-gray-600">Clients</a></li>
              <li><a href="#" className="text-gray-600">Service Items</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-600" />
          <UserButton></UserButton>
          {/* <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full" /> */}
          {/* <ChevronDown className="h-4 w-4 text-gray-600" /> */}
        </div>
      </header> </div>
  );
};
