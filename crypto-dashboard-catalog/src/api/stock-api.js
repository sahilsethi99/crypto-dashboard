const basePath = "https://query2.finance.yahoo.com/v1/finance";
const basePath2 = "https://query2.finance.yahoo.com/v7/finance/"

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

export const fetchHistoricalData = async (symbol, interval='1d',range='1mo')=>{
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `Some error occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}