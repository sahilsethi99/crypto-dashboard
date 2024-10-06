import React, { useContext, useEffect, useState } from 'react'
import Card from './Card';
import { mockHistoricalData } from '../constants/mockData';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { convertDateToUnixTimestamp,convertUnixTimestampToDate, createDate } from '../utils/date-helpers';
import { fetchHistoricalData } from '../api/stock-api';
import StockContext from '../context/StockContext';
import { chartConfig } from '../constants/config';

const Chart = () => {

    const [data,setData] = useState(mockHistoricalData);
    const [filter,setFilter] = useState("1w");

    const {stockSymbol} = useContext(StockContext);

    const formatData = () => {
        return data.c.map((item, index) => {
          return {
            value: item.toFixed(2),
            date: convertUnixTimestampToDate(data.t[index]),
          };
        });
      };

    // useEffect(()=>{
    //     const getDateRange = ()=>{
    //         const { days,weeks,months,years } = chartConfig[filter];

    //         const endDate = new Date();
    //         const startDate = createDate(endDate, -days, -weeks, -months, -years);
            
    //         const startTimestampUnix = convertDateToUnixTimestamp(startDate);
    //         const endTimestampUnix = convertDateToUnixTimestamp(endDate);

    //         return {startTimestampUnix, endTimestampUnix};
    //     }

    //     const updateChartData = async ()=>{
    //         try{
    //             const {startTimestampUnix, endTimestampUnix} = getDateRange();
    //             const result = await fetchHistoricalData(stockSymbol);
    //             setData(formatData(result));
    //         }catch(e){
    //             setData([]);
    //             console.log(e);
    //         }
    //     }

    //     updateChartData();
    // },[stockSymbol,filter]);
  
  
return (
    <Card>
        <ResponsiveContainer>
        <AreaChart data={formatData(data)}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgb(199 210 254)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgb(199 210 254)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          {/* <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          /> */}
                <Area type="monotone" data="value" stroke="#312e81" fillOpacity={1} strokeWidth={0.5}>
                <Tooltip>
                </Tooltip>
                <XAxis dataKey="date"/>
                <YAxis domain={["dataMin", "dataMax"]}/>
                </Area>
            </AreaChart>
        </ResponsiveContainer>
    </Card>
    // <div>Chart</div>
  )
}

export default Chart