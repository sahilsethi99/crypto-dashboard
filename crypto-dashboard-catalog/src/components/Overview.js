import React from 'react'
import Card from './Card'

const Overview = ({price, change, changePercent,symbol}) => {
  return (
    <Card>
        <div className="w-full h-full flex-col justify-start items-center">
            <div className="">
            <span className="text-3xl xl:text-6xl 2xl:text-8xl">${price}
            </span>
            <span className="absolute text-neutral-400 text-sm">{symbol}</span>
            
            </div>
        <span className={`text-sm xl:text-base 2xl:text-base ${change>0 ? "text-lime-500" : "text-red-500"}`}>+ {change} <span>({changePercent}%)</span>
        </span>
        </div>
    </Card>
  )
}

export default Overview