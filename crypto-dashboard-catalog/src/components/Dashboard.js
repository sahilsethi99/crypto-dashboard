import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { mockCompanyDetails } from '../constants/mockData'
import Header from './Header'
import Overview from './Overview'
import ChartFilters from './ChartFilters'
import StockContext from '../context/StockContext'
import { fetchHistoricalData, fetchQuote } from '../api/stock-api'
import Chart from './Chart'
import MenuFilters from './MenuFilters'

const Dashboard = () => {
    const {stockSymbol} = useContext(StockContext);

    const [quote, setQuote] = useState({regularMarketPrice:"0"});
    
    const [currentPrice,setCurrentPrice] = useState(0);
    const [previosClose,setPreviosClose] = useState(0);
    const [changePercent,setChangePercent] = useState(0.5);

    const changePercentCalculate = (currentPrice, previosClose) =>{
        const priceChange = (currentPrice - previosClose).toFixed(2); // Change in price
        setChangePercent(((priceChange / previosClose) * 100).toFixed(2)); // Percent change
    }


    useEffect(()=>{
        const updateStockOverview = async()=>{ 
            try{
                const result = await fetchQuote(stockSymbol);
                setQuote(result?.chart?.result[0]?.meta);
                console.log(result);
                setCurrentPrice(result?.chart?.result[0]?.meta?.regularMarketPrice);
                setPreviosClose(result?.chart?.result[0]?.meta?.chartPreviousClose);
                
            }catch(e){
                setQuote({});
                console.log(e);

            }
        };

        updateStockOverview();
        if(currentPrice!=0 && previosClose!=0)changePercentCalculate(currentPrice,previosClose);
    }, [stockSymbol]);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-tinos bg-neutral-100">
        <div className="col-span-1 md:col-span-1 xl:col-span-1 row-span-2 flex justify-start items-center">
            {/* <Card>Header</Card>
             */}
             {/* <Header name={mockCompanyDetails.companyName}/> */}
             <Overview price={currentPrice} change={(currentPrice-previosClose).toFixed(2)} changePercent={changePercent} symbol={"USD"}/>
        </div>
        <div className="col-span-1 md:col-span-1 xl:col-span-2 row-span-2 flex justify-start items-center">
            {/* <Card>Header</Card>
             */}
             <Header name={stockSymbol}/>
             {/* <Overview price={300000} change={30} changePercent={10.0} symbol={"USD"}/> */}
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1">
            {/* <Card>Menu Options</Card> */}
           <MenuFilters/>
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1">
            <ChartFilters/>
            {/* <Card>Filters</Card> */}
        </div>
        <div className="md:col-span-2 xl:col-span-3 row-span-4 ">
            {/* <Card>Chart</Card> */}
            <Chart className=""/>
        </div>
    </div>
  )
}

export default Dashboard