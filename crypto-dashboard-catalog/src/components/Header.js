import React from 'react'
import Search from './Search'

const Header = ({name}) => {
  return <>
    <div className="">    
        {/* <Company Price/> */}
        <h1 className="text-5xl">{name}</h1>
        <Search/>
        {/* <ThemeIcon/> */}

    </div>
  </>
}

export default Header