export const chartConfig = {
    "1d" : {days: 1, weeks: 0, months: 0, years: 0},
    "3d" : {days: 3, weeks: 0, months: 0, years: 0},
    "1w" : {days: 0, weeks: 1, months: 0, years: 0},
    "1m" : {days: 0, weeks: 0, months: 1, years: 0},
    "6m" : {days: 0, weeks: 0, months: 6, years: 0},    
    "1y" : {days: 0, weeks: 0, months: 0, years: 1},
    "max" : {days: 0, weeks: 0, months: 0, years: 1},
    
    
}

export const chartFilterConfig = {
    "1d" : {interval: '1d', range:'1mo'},
    "3d" : {interval: '5d', range:'6mo'},
    "1w" : {interval: '1wk', range:'1y'},
    "1m" : {interval: '1mo', range:'1y'},
    "6m" : {interval: '3mo', range:'2y'},
    "1y" : {interval: '3mo', range:'5y'},
    "max" : {interval:'3mo', range:'10y'},    
    
}