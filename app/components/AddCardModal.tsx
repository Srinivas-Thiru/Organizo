import React from 'react'

const AddCardModal = ({isOpen, setIsOpen, children}) => {

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center'>
        <div className='w-[600px] h-auto flex flex-col'>
            <button className='text-white text-xl place-self-end' onClick={() => setIsOpen(!isOpen)}>X</button>
            <div className='bg-white p-2 rounded-lg '>
                {children}
            </div>
        </div>
    </div>
  )
}

export default AddCardModal