import React, { useContext } from 'react'
import Card from './Card'
import ThemeContext from '../context/ThemeContext'

const Overview = ({price, change, changePercent,symbol}) => {
    const {darkMode} = useContext(ThemeContext);

  return (
    <Card>
        <div className="w-full h-full flex-col justify-start items-center">
            <div className="">
            <span className={`text-3xl xl:text-6xl 2xl:text-8xl  ${darkMode ? "text-white" : "text-[#1A243A]"} `}>{price} 
            </span>
            <span className="absolute text-neutral-400 text-sm">{symbol}</span>
            
            </div>
        <span className={`text-sm xl:text-base 2xl:text-2xl ${change>0 ? "text-[#67BF6B]" : "text-red-500"}`}>{ (change>0) ? `+` : `` }{change} <span>({changePercent}%)</span>
        </span>
        </div>
    </Card>
  )
}

export default Overview