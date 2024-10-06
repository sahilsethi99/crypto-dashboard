import React, { useContext, useState } from 'react'
import { chartConfig } from '../constants/config'
import Filter from './Filters'
import FilterContext from '../context/FilterContext'
import { PlusIcon } from '@heroicons/react/solid'

const ChartFilters = () => {
    
    const {filter,setFilter} = useContext(FilterContext);
  return (
    <>
    <div className="flex flex-col md:flex-row">
    <div className="flex flex-row md:flex-row my-2 md:my-0">

    <div className="flex mr-10  md:flex">
        <img src="/expand-gray-icon.png" alt="Expand Icon" className="w-6 h-6 p-1 mr-1 " />
        <div className="text-[#8B8B8B]">Fullscreen</div>
        </div>
    <div className="flex mr-20  md:flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8B8B8B" className="size-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <div className="text-[#8B8B8B]">Compare</div>      
    </div>
    </div>
    <ul className="flex">
        {Object.keys(chartConfig).map((item) => {
            return (<li key={item}>
                <Filter text={item} 
                    active={filter === item} 
                    onClick={()=>{
                    setFilter(item);
                    }}
                />
            </li>
            )
            })}
    </ul>
    </div>
    </>
  )
}

export default ChartFilters