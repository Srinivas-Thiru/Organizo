import React from 'react'

const loading = () => {
  return (
    <>
  
     
      <div className="py-4 mx-auto mt-5 rounded-lg bg-[--bg-board]" style={{width: 'min(1000px, 80vw)'}}>
      <div className="flex w-full p-8 rounded-lg shadow-md">
      <div className="animate-pulse ml-10 rounded-full bg-slate-700 h-32 w-40"></div>
        <h1 className="text-3xl font-bold mt-4 w-full flex justify-center items-center">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className='flex  flex-col gap-4 w-96 text-xl items-center mx-auto my-4 '>
      <div className="h-3 bg-slate-500 rounded w-[14ch]"></div>
      </div>
        </h1>
      </div>
        <div className='  z-50 flex w-96 text-xl justify-between mx-auto my-4 '>
        <div className="h-2 bg-slate-500 rounded w-[8ch]"></div>
        <div className="h-2 bg-slate-500 rounded w-[12ch]"></div>
     </div>
     <div className='  z-50 flex w-96 text-xl justify-between mx-auto my-4 '>
        <div className="h-2 bg-slate-500 rounded w-[8ch]"></div>
        <div className="h-2 bg-slate-500 rounded w-[12ch]"></div>
     </div>
        
    </div> 
    </>
  )
}

export default loading