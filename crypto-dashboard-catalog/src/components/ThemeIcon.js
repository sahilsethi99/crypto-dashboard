import { MoonIcon } from '@heroicons/react/solid'
import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const ThemeIcon = () => {
    const {darkMode, setDarkMode} = useContext(ThemeContext);

    const toggleDarkMode = () =>{
        setDarkMode(!darkMode);
    };

  return <button 
            className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-2 top-2 xl:right-20 xl:top-2 shadow-lg 
                ${darkMode ? "shadow-gray-100": null }`}
            onClick={toggleDarkMode}
        >
    <MoonIcon className={`h-8 w-8 cursor-pointer stroke-1 fill-none stroke-neutral-400 ${darkMode ? "fill-yellow-400 stroke-yellow-400" 
        : "fill-none stroke-neutral-400" }`}/>
  </button>
}

export default ThemeIcon