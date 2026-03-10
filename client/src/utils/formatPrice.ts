export interface Price {
    value: number;
    symbol: string;
    isDefault: number;
}

export const formatPrice = (prices: Price[], symbol: string): string => {
    const found = prices.find(p => p.symbol === symbol);
    if (!found) return '';
    const displaySymbol = symbol === 'USD' ? '$' : symbol;
    return `${found.value.toLocaleString('uk-UA').replace(/\s|\u202f/g, ' ')} ${displaySymbol}`;
};

export const getTotalPrice = (products: any[], symbol: string): string => {
    const total = products.reduce((acc, p) => {
        const priceEntry = p.price?.find((pr: Price) => pr.symbol === symbol);
        return acc + (priceEntry?.value ?? 0);
    }, 0);
    const displaySymbol = symbol === 'USD' ? '$' : symbol;
    return `${total.toLocaleString('uk-UA').replace(/\s|\u202f/g, ' ')} ${displaySymbol}`;
};
