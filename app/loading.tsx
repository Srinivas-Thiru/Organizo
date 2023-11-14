import React from 'react'


const loading = () => {
  return (
    <div >
        <div className='flex h-screen rounded-3xl bg-[--bg-board]'> 
        <div className="bg-[--bg-navbar]">
            <div className="pb-10 overflow-y-scroll sidenav  bg-[--bg-sideNav] text-[--text-sideNav] text-center " style={{ height: '91vh'}}>
                <div className='py-[2.5ch] mb-4  text-center shadow-md h-[6.5ch]'>
                    <div className="ml-5 h-2 bg-[#fffbe94a] backdrop-blur-lg  rounded w-[10ch]"></div>
                </div>
                <div className="ml-5 my-10 h-2 bg-[#fffbe94a] backdrop-blur-lg  rounded w-[10ch]"></div>

                <div className="ml-5 my-10 h-2 bg-[#fffbe94a] backdrop-blur-lg  rounded w-[10ch]"></div>

                <div className="ml-5 my-10 h-2 bg-[#fffbe94a] backdrop-blur-lg  rounded w-[10ch]"></div>

            </div>
            </div>
            <div className=' flex  '>
                <div className='z-40 boardNav items-center fixed bg-[--bg-boardNav] p-2 shadow-md flex justify-between h-[6ch] ' >
                        <div className="h-2 bg-slate-500 rounded w-[10ch]"></div>
                        <div className="h-2 bg-slate-500 rounded w-[5ch]"></div>

                        
                </div>

                <div className="w-[250px] rounded-lg  shadow-md bg-[--bg-list] mx-5 mt-[9ch] h-[30vh]"  >
                    <div className='flex justify-between items-center p-2'>  
                        <h2 className=" text-lg font-semibold  w-screen text-center "><div className="ml-5 my-10 h-2 bg-[#fffbe94a] backdrop-blur-lg rounded w-[10ch]"></div></h2>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default loading