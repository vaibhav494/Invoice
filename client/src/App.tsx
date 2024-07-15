import Main_Invoice from './components/Main_Invoice'
import { invoice } from './data/types'
import { useState } from 'react'
import Seller_entry from './seller_entry'
// import {CommonProvider} from './context_common/context'
function App() {
  const [sssname, setSssname] = useState<string[]>([]);
  const savedInvoice = window.localStorage.getItem('invoiceData')
  let data = null

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice)
    }
  } catch (_e) {}

  const onInvoiceUpdated = (invoice: invoice) => {
    window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
  }

  // return (
  //   <>

  //   <div className="main-div">
  //   <div className='seller-entry-main'>
  //     <h1 className='center fs-30'>Seller Entry</h1>
  //     <CommonProvider>
  //     <Seller_entry/>
  //     </CommonProvider>
        
      
  //   </div>
  //   <div className="app">
  //     <h1 className="center fs-30">Generate Invoice Here</h1>
  //     <CommonProvider>
  //     <Main_Invoice data={data} onChange={onInvoiceUpdated} />
  //     </CommonProvider>
      
      
  //   </div>
  //   <div className='clear'></div>
  //   </div>

    
  //   </>
  // )
  return (
    <>
    <div className="main-div">
    <div className='seller-entry-main'>
      <h1 className='center fs-30'>Seller Entry</h1>
      
      <Seller_entry fstate={sssname} fsetState={setSssname}/>
      
        
      
    </div>
    <div className="app">
      <h1 className="center fs-30">Generate Invoice Here</h1>
      
      <Main_Invoice data={data} onChange={onInvoiceUpdated} fstate={sssname}  />
      
      
      
    </div>
    <div className='clear'></div>
    </div>
    
    </>
  )
}

export default App