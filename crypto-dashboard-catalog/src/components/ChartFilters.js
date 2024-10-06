import React, { useContext, useState } from 'react'
import { chartConfig } from '../constants/config'
import Filter from './Filters'
import FilterContext from '../context/FilterContext'

const ChartFilters = () => {
    
    const {filter,setFilter} = useContext(FilterContext);
  return (
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
  )
}

export default ChartFilters