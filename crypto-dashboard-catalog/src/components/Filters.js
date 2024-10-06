import React from 'react'

const Filter = ({text, active, onClick}) => {
  return (
    <button 
        onClick={onClick}
        className={`w-8 mx-2 hx-8 border-none rounded-md flex items-center justify-center cursor-pointer
         ${active 
            ? "bg-[#4B40EE] border-indigo-700 text-gray-100"
            : "border-indigo-300 text-gray-600"
             }`}
    >
        {text}
  </button>)
}

export default Filter