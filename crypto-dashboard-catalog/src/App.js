import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import ThemeContext from './context/ThemeContext';
import StockContext from './context/StockContext';
import FilterContext from './context/FilterContext';

function App() {
  const [darkMode,setDarkMode] = useState(false);
  const [stockSymbol,setStockSymbol] = useState("AAPL"); 
  const [filter,setFilter] = useState("1w");

  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
    <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
    <FilterContext.Provider value={{filter,setFilter}}>
      <Dashboard/>
    </FilterContext.Provider>
    </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
