import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main_Invoice from './components/Main_Invoice';
import Seller_entry from './seller_entry';
import Bill_detail from './pages/bill_detail';
import { invoice } from './data/types';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  const [sssname, setSssname] = useState<string[]>([]);
  
  const savedInvoice = window.localStorage.getItem('invoiceData');
  let data = null;

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice);
    }
  } catch (e) {
    console.error('Error parsing invoice data:', e);
  }

  const onInvoiceUpdated = (invoice: invoice) => {
    window.localStorage.setItem('invoiceData', JSON.stringify(invoice));
  };

  //without clerk
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <header>
          
       
          <div className="main-div">
              <div className="seller-entry-main">
                <h1 className="center fs-30">Seller Entry</h1>
                <Seller_entry fstate={sssname} fsetState={setSssname} />
              </div>
              <div className="app">
                <h1 className="center fs-30">Generate Invoice Here</h1>
                <Main_Invoice
                  data={data}
                  onChange={onInvoiceUpdated}
                  fstate={sssname}
                />
              </div>
              <div className="clear"></div>
            </div>

        </header>
        }
        />
        <Route
          path="/invoice"
          element={
   
            <div className="main-div">
              <div className="seller-entry-main">
                <h1 className="center fs-30">Seller Entry</h1>
                <Seller_entry fstate={sssname} fsetState={setSssname} />
              </div>
              <div className="app">
                <h1 className="center fs-30">Generate Invoice Here</h1>
                <Main_Invoice
                  data={data}
                  onChange={onInvoiceUpdated}
                  fstate={sssname}
                />
              </div>
              <div className="clear"></div>
            </div>
          }
        />
        <Route path="/bill_detail" element={<Bill_detail />} />
        <Route path="/estimate_invoice" element={<>hello</>} />
      </Routes>
    </BrowserRouter>
  );

  //with clerk
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={
  //         <header>
  //         <SignedOut>
  //           <SignInButton />
  //         </SignedOut>
  //         <SignedIn>
  //         <div className="main-div">
  //             <div className="seller-entry-main">
  //               <h1 className="center fs-30">Seller Entry</h1>
  //               <Seller_entry fstate={sssname} fsetState={setSssname} />
  //             </div>
  //             <div className="app">
  //               <h1 className="center fs-30">Generate Invoice Here</h1>
  //               <Main_Invoice
  //                 data={data}
  //                 onChange={onInvoiceUpdated}
  //                 fstate={sssname}
  //               />
  //             </div>
  //             <div className="clear"></div>
  //           </div>
  //         </SignedIn>
  //       </header>
  //       }
  //       />
  //       <Route
  //         path="/invoice"
  //         element={
  //           <SignedIn>
  //           <div className="main-div">
  //             <div className="seller-entry-main">
  //               <h1 className="center fs-30">Seller Entry</h1>
  //               <Seller_entry fstate={sssname} fsetState={setSssname} />
  //             </div>
  //             <div className="app">
  //               <h1 className="center fs-30">Generate Invoice Here</h1>
  //               <Main_Invoice
  //                 data={data}
  //                 onChange={onInvoiceUpdated}
  //                 fstate={sssname}
  //               />
  //             </div>
  //             <div className="clear"></div>
  //           </div>
  //           </SignedIn>
  //         }
  //       />
  //       <Route path="/bill_detail" element={<Bill_detail />} />
  //       <Route path="/estimate_invoice" element={<>hello</>} />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
