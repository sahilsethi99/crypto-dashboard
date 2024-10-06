import React, { useContext, useEffect, useState } from 'react'
import Card from './Card';
import { mockHistoricalData } from '../constants/mockData';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { convertDateToUnixTimestamp,convertUnixTimestampToDate, createDate } from '../utils/date-helpers';
import { fetchHistoricalData } from '../api/stock-api';
import StockContext from '../context/StockContext';
import { chartConfig } from '../constants/config';

const Chart = () => {

    // Price data (Monthly)
const priceData = [
    { date: "Jan 2024", low: 224.14, high: 228.0 },
    { date: "Feb 2024", low: 223.56, high: 227.1 },
    { date: "Mar 2024", low: 220.12, high: 225.6 },
    { date: "Apr 2024", low: 221.78, high: 226.5 }
  ];
  
  // Volume data (More granular - e.g., weekly within months)
  const volumeData = [
    { date: "Jan Week 1", volume: 37245100 },
    { date: "Jan Week 2", volume: 48251234 },
    { date: "Jan Week 3", volume: 39562890 },
    { date: "Jan Week 4", volume: 45123450 },
    { date: "Feb Week 1", volume: 33256789 },
    { date: "Feb Week 2", volume: 47236891 },
    { date: "Feb Week 3", volume: 39284710 },
    { date: "Mar Week 1", volume: 37245100 },
    { date: "Mar Week 2", volume: 48251234 },
    { date: "Mar Week 3", volume: 39562890 },
    { date: "Mar Week 4", volume: 45123450 },
    { date: "Apr Week 1", volume: 33256789 },
    { date: "Apr Week 2", volume: 47236891 }
  ];

    const [data,setData] = useState([
        { date: "09/01/2024", low: 224.14, high: 228.0, volume: 37245100 },
        { date: "09/02/2024", low: 223.56, high: 227.1, volume: 48251234 },
        { date: "09/03/2024", low: 220.12, high: 225.6, volume: 39562890 },
        { date: "09/04/2024", low: 221.78, high: 226.5, volume: 45123450 },
        { date: "09/05/2024", low: 222.34, high: 227.8, volume: 33256789 },
        { date: "09/06/2024", low: 225.45, high: 229.1, volume: 47236891 },
        { date: "09/07/2024", low: 224.11, high: 228.9, volume: 39284710 }
      
      ]
      );
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
        <ComposedChart data={priceData}> 
  {/* Gradient Definition */}
  <defs>
    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
    </linearGradient>
  </defs>

  {/* Grid and Axes */}
  <CartesianGrid vertical={true} horizontal={false} />
  <XAxis dataKey="date" />  {/* X-Axis for Price Data */}
  <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} />  {/* Y-Axis for Price */}

  {/* Right Y-Axis for Volume (hidden) */}
  <YAxis yAxisId="right" orientation="right" hide={true} />

  {/* Tooltip to show price and volume details on hover */}
  <Tooltip />

  {/* Area Chart with Linear Connection for Straight Lines */}
  <Area
    yAxisId="left"
    type="linear"  // Linear for straight lines between points
    dataKey="high"
    stroke="#8884d8"
    fillOpacity={1}
    fill="url(#colorPrice)"
  />
  
  {/* Bar Chart for Volume */}
  <Bar
    yAxisId="right"
    data={volumeData}  // Same X-Axis as price chart (matches timestamps)
    dataKey="volume"
    fill="#000000"
    barSize={5}
    opacity={0.5}
  />
</ComposedChart>

    </ResponsiveContainer>
    </Card>
    // <div>Chart</div>
  )
}

export default Chart