import React, { useContext, useEffect, useState } from 'react'
import Card from './Card';
import { mockHistoricalData } from '../constants/mockData';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { convertDateToUnixTimestamp,convertUnixTimestampToDate, createDate } from '../utils/date-helpers';
import { fetchHistoricalData, fetchQuote } from '../api/stock-api';
import StockContext from '../context/StockContext';
import { chartConfig,chartFilterConfig } from '../constants/config';
import ChartFilters from './ChartFilters';
import FilterContext from '../context/FilterContext';
import ThemeContext from '../context/ThemeContext';


const Chart = () => {
    const {darkMode} = useContext(ThemeContext);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length > 0) {
            // Get the high price from the payload
            const highPrice = payload[0].payload.high; // Assuming high is at the first index
            return (
                <div
                    className={` p-2 rounded text-white ${darkMode ?  "bg-[#4B40EE]" : "bg-black "}`}
                >
                    <p>{`${highPrice.toFixed(2)}`}</p>
                </div>
            );
        }
        return null; // Don't render anything if not active
    };


   // Price data (Monthly)
    const [priceData,setPriceData]= useState( [
        { date: "Jan 2024", low: 224.14, high: 228.0 },
        { date: "Feb 2024", low: 223.56, high: 227.1 },
        { date: "Mar 2024", low: 220.12, high: 225.6 },
        { date: "Apr 2024", low: 221.78, high: 226.5 }
      ]);
  
  // Volume data (More granular - e.g., weekly within months)
  const [volumeData,setVolumeData] = useState([  { date: "Jan Week 1", volume: 37245100 },
    { date: "Jan Week 2", volume: 48251234 },
    { date: "Jan Week 3", volume: 39562890 },
    { date: "Jan Week 4", volume: 45123450 },
    { date: "Feb Week 1", volume: 33256789 },]);

    const {filter} = useContext(FilterContext);
    const {stockSymbol} = useContext(StockContext);


      const fetchYahooFinanceData = async () => {
        try {
            console.log(filter);
            console.log(chartFilterConfig);
            console.log(chartFilterConfig.filter);
            const {interval, range}=chartFilterConfig[filter];
          const result = await fetchHistoricalData(stockSymbol,interval,range);
          
          
          const { timestamp, indicators } = result.chart.result[0];
          const { high, low, volume } = indicators.quote[0];
          
          // Format price data (high and low)
          const formattedPriceData = timestamp.map((time, index) => ({
            date: new Date(time * 1000).toLocaleDateString(), // Convert UNIX timestamp to human-readable date
            high: high[index],
            low: low[index]
          }));
    
          // Format volume data
          const formattedVolumeData = timestamp.map((time, index) => ({
            date: new Date(time * 1000).toLocaleDateString(),
            volume: volume[index]
          }));
    
          // Update state
          setPriceData(formattedPriceData);
          setVolumeData(formattedVolumeData);
        } catch (error) {
          console.error("Error fetching Yahoo Finance data: ", error);
        }
      };
    useEffect(()=>{
        fetchYahooFinanceData();
    },[stockSymbol,filter]);
  
  
return (
    <Card>
        {/* <ChartFilters/> */}
        <ResponsiveContainer className="mx-[-5rem]">
        <ComposedChart data={priceData}> 
  {/* Gradient Definition */}
  <defs>
    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={`${darkMode ? "#312e81":"#8884d8"}`} stopOpacity={0.8} />
      <stop offset="100%" stopColor={`${darkMode ? "#312e81":"#8884d8"}`} stopOpacity={0} />
    </linearGradient>
  </defs>

  {/* Grid and Axes */}
  <CartesianGrid vertical={true} horizontal={false} />
  <XAxis dataKey="date" />  {/* X-Axis for Price Data */}
  <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} 
   axisLine={false} // Hides the axis line
   tick={false} // Hides the tick marks and values
   />  {/* Y-Axis for Price */}

  {/* Right Y-Axis for Volume (hidden) */}
  <YAxis yAxisId="right" orientation="right" hide={true} />

  {/* Tooltip to show price and volume details on hover */}
  {/* <Tooltip contentStyle={darkMode ? {backgroundColor:"#111827"} : {backgroundColor:'gray'}}
    itemStyle={darkMode ? {backgroundColor:"#818cf8"}: {bac}}
  /> */}

<Tooltip 
    content={<CustomTooltip />} 
    contentStyle={darkMode ? { backgroundColor: "#111827" } : { backgroundColor: "gray" }}
/>

  {/* Area Chart with Linear Connection for Straight Lines */}
  <Area
    yAxisId="left"
    type="linear"  // Linear for straight lines between points
    dataKey="high"
    stroke="#4B40EE"
    fillOpacity={1}
    fill="url(#colorPrice)"
  />
  
  {/* Bar Chart for Volume */}
  <Bar
    yAxisId="right"
    data={volumeData}  // Same X-Axis as price chart (matches timestamps)
    dataKey="volume"
    fill="#D1D5DB"
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