import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { fetchHistoricalData, fetchHistoricalDataAlphaVantage } from '../api/stock-api';  // Updated Alpha Vantage function
import StockContext from '../context/StockContext';
import FilterContext from '../context/FilterContext';
import ThemeContext from '../context/ThemeContext';
import { chartFilterConfigAlphaVantage } from '../constants/config';

const Chart = () => {
    const { darkMode } = useContext(ThemeContext);
    const { stockSymbol } = useContext(StockContext);
    const {filter} = useContext(FilterContext);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length > 0) {
            const highPrice = payload[0].payload.high;
            return (
                <div className={`p-2 rounded text-white ${darkMode ? "bg-[#4B40EE]" : "bg-black "}`}>
                    <p>{`${highPrice.toFixed(2)}`}</p>
                </div>
            );
        }
        return null;
    };

    // State to hold price and volume data
    const [priceData, setPriceData] = useState([]);
    const [volumeData, setVolumeData] = useState([]);

    const fetchAlphaVantageData = async () => {
        try {
          const { function: functionName } = chartFilterConfigAlphaVantage[filter];
            const result = await fetchHistoricalDataAlphaVantage(stockSymbol, filter);;
            
            // Format price data (high and low)
            const formattedPriceData = result.map((data) => ({
              date: data.date,
              high: data.high,
              low: data.low
          }));

           // For volume, 
           const formattedVolumeData = result.map((data) => ({
            date: data.date,
            volume: data.volume
        }));
            setPriceData(formattedPriceData);
            setVolumeData(formattedVolumeData);
        } catch (error) {
            console.error("Error fetching Alpha Vantage data: ", error);
        }
    };

    useEffect(() => {
        fetchAlphaVantageData();
    }, [filter, stockSymbol]);

    return (
        <Card>
            <ResponsiveContainer className="mx-[-5rem]">
                <ComposedChart data={priceData}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={darkMode ? "#312e81" : "#8884d8"} stopOpacity={0.8} />
                            <stop offset="100%" stopColor={darkMode ? "#312e81" : "#8884d8"} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={true} horizontal={false} />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} axisLine={false} tick={false} />
                    <YAxis yAxisId="right" orientation="right" hide={true} />
                    <Tooltip content={<CustomTooltip />} contentStyle={darkMode ? { backgroundColor: "#111827" } : { backgroundColor: "gray" }} />
                    <Area yAxisId="left" type="linear" dataKey="high" stroke="#4B40EE" fillOpacity={1} fill="url(#colorPrice)" />
                    <Bar yAxisId="right" data={volumeData} dataKey="volume" fill="#D1D5DB" barSize={5} opacity={0.5} />
                </ComposedChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default Chart;
