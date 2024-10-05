import React from 'react'
import Card from './Card'
import { mockCompanyDetails } from '../constants/mockData'
import Header from './Header'
import Overview from './Overview'

const Dashboard = () => {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-tinos">
        <div className="col-span-1 md:col-span-1 xl:col-span-1 row-span-2 flex justify-start items-center">
            {/* <Card>Header</Card>
             */}
             {/* <Header name={mockCompanyDetails.companyName}/> */}
             <Overview price={300000} change={30} changePercent={10.0} symbol={"USD"}/>
        </div>
        <div className="col-span-1 md:col-span-1 xl:col-span-2 row-span-2 flex justify-start items-center">
            {/* <Card>Header</Card>
             */}
             {/* <Header name={mockCompanyDetails.companyName}/> */}
             {/* <Overview price={300000} change={30} changePercent={10.0} symbol={"USD"}/> */}
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1">
            <Card>Menu Options</Card>
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1">
            <Card>Filters</Card>
        </div>
        <div className="md:col-span-2 xl:col-span-3 row-span-4">
            <Card>Chart</Card>
        </div>
    </div>
  )
}

export default Dashboard