const basePath = "https://query2.finance.yahoo.com/v1/finance";

const baseUrl = "https://www.alphavantage.co/query";
const apiKey = process.env.REACT_APP_API_KEY;  // Replace with your Alpha Vantage API key

export const fetchHistoricalData = async (symbol) => {
    const url = `${baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `Some error occurred: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();

    if (data["Error Message"]) {
        throw new Error("Invalid symbol or API error.");
    }

    // Process response into a similar format as Yahoo Finance API response
    const timeSeries = data["Time Series (Daily)"];
    const timestamps = Object.keys(timeSeries).reverse();  // Dates (most recent first)
    const formattedData = timestamps.map((date) => ({
        date: date,
        high: parseFloat(timeSeries[date]["2. high"]),
        low: parseFloat(timeSeries[date]["3. low"]),
        volume: parseInt(timeSeries[date]["5. volume"])
    }));

    return formattedData; // Return data in the format needed for the chart
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