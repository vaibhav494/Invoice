import React from 'react'

function Payment() {
  return (
    <div className='flex gap-32 text-sm h-24 mt-5 w-full '>
        <div >
            <div className='mb-2'>Overdue</div>
            <div className='text-3xl'>₹4992 RS</div>
        </div>
        <div>
            <div className='mb-2'>Total Outstanding</div>
            <div className='text-3xl'>₹3456 RS</div>
        </div>
    </div>
  )
}

export default Payment