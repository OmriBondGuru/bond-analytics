export interface Bond {
    id: string;
    name: string;
    price: number;
    yield: number;
    duration: number;
    rating: string;
    maturity: string;
    weeklyYieldChange: number;
    historicalYields?: HistoricalYield[];
}

export interface BondPerformanceData {
    date: string;
    yield: number;
}

export interface HistoricalYield {
    date: string;
    yield: number;
} 