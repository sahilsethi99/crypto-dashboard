import React, { useState } from 'react'
import Card from './Card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Chart = () => {

    const [data,setData] = useState();
    const [filter,setFilter] = useState("1W");


  return (
    <Card>
        <ResponsiveContainer>
            <AreaChart data={formatData(data)}>
                <Area type="monotone" data="value" stroke="#312e81" fillOpacity={1} strokeWidth={0.5}>
                <Tooltip>
                </Tooltip>
                <XAxis dataKey={"date"}/>
                <YAxis domain={["dataMin", "dataMax"]}/>
                </Area>
            </AreaChart>
        </ResponsiveContainer>
    </Card>
    // <div>Chart</div>
  )
}

export default Chart