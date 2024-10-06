import React, { useContext, useState } from 'react'
import { chartConfig } from '../constants/config'
import Filter from './Filters'
import FilterContext from '../context/FilterContext'
import { PlusIcon } from '@heroicons/react/solid'

const ChartFilters = () => {
    
    const {filter,setFilter} = useContext(FilterContext);
  return (
    <>
    <div className="flex ">
    

    <div className="mr-10">FullScreen</div>
    <div className="flex mr-20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#D3D3D3" className="size-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Compare
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