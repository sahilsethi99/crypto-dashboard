import React, { useContext } from 'react'
import StockContext from '../context/StockContext';
import ThemeContext from '../context/ThemeContext';

const SearchResults = ({results}) => {
    const {setStockSymbol} = useContext(StockContext);
    const {darkMode} = useContext(ThemeContext);


  return (
    <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll  ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark" : "bg-white border-neutral-200 custom-scrollbar"}`}>
        {results.map((item)=>{
            return (<li key={item.exchDisp}
                        onClick={()=>{setStockSymbol(item.symbol);}}
                        className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md  ${darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"}`}>
                <span>{item.symbol}</span>
                <span>{item.exchDisp}</span>
            </li>
            );
        })}
    </ul>
  )
}

export default SearchResults