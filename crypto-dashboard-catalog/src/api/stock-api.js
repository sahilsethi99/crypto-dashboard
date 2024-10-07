import { chartFilterConfigAlphaVantage } from "../constants/config";

const basePath = "https://query2.finance.yahoo.com/v1/finance";

const baseUrl = "https://www.alphavantage.co/query";
const API_KEY = process.env.REACT_APP_API_KEY;  // Replace with your Alpha Vantage API key

export const fetchHistoricalDataAlphaVantage = async (stockSymbol, filter) => {
    const { function: functionName, interval } = chartFilterConfigAlphaVantage[filter];
    // const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY';
    
    // Create the API URL based on the selected function
    let url = `https://www.alphavantage.co/query?function=${functionName}&symbol=${stockSymbol}&apikey=${API_KEY}`;

    // Append the interval for intraday functions
    if (functionName.includes("INTRADAY")) {
        url += `&interval=${interval}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // Process the response based on the function used
    if (functionName === 'TIME_SERIES_INTRADAY') {
        const { "Time Series (1min)": timeSeries } = data;
        const formattedData = Object.entries(timeSeries).map(([timestamp, values]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            volume: parseFloat(values['5. volume'])
        }));
        return formattedData;
    } else if (functionName === 'TIME_SERIES_DAILY') {
        const { "Time Series (Daily)": timeSeries } = data;
        const formattedData = Object.entries(timeSeries).map(([timestamp, values]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            volume: parseFloat(values['5. volume'])
        }));
        return formattedData;
    } else if (functionName === 'TIME_SERIES_MONTHLY') {
        const { "Monthly Time Series": timeSeries } = data;
        const formattedData = Object.entries(timeSeries).map(([timestamp, values]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            volume: parseFloat(values['5. volume'])
        }));
        return formattedData;
    } else {
        throw new Error('Unsupported function');
    }
};


export const searchSymbols = async (query)=>{
    const url = `${basePath}/search?q=${query}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `Some error occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

export const fetchQuote = async (symbol)=>{
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `Some error occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

// export const fetchHistoricalData = async (symbol, interval='1d',range='1mo')=>{
//     const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
//     console.log('url ',url);
//     const response = await fetch(url);
//     console.log('response ',response);
//     if(!response.ok){
//         const message = `Some error occured: ${response.status}`;
//         throw new Error(message);
//     }

//     return await response.json();
// }