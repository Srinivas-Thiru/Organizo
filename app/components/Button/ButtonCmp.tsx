import React from 'react'
import './ButtonCmp.css'

const ButtonCmp = ({id, handleClick, children}) => {
  return (
    <button className='glass-button mx-1' onClick={handleClick} id={id}>{children}</button>
  )
}

export default ButtonCmp