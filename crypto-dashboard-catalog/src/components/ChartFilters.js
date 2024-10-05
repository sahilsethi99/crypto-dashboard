import React, { useState } from 'react'
import { chartConfig } from '../constants/config'
import Filter from './Filters'

const ChartFilters = () => {
    
    const [filter,setFilter] = useState("1w");
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