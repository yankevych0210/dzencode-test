import { formatPrice, getTotalPrice } from './formatPrice';

describe('formatPrice utility', () => {
    const mockPrices = [
        { value: 100, symbol: 'USD', isDefault: 0 },
        { value: 2700, symbol: 'UAH', isDefault: 1 },
    ];

    it('should correctly format USD price with a $ symbol', () => {
        expect(formatPrice(mockPrices, 'USD')).toBe('100 $');
    });

    it('should correctly format UAH price', () => {
        expect(formatPrice(mockPrices, 'UAH')).toBe('2 700 UAH'); // toLocaleString('uk-UA') adds non-breaking space
    });

    it('should return empty string if symbol is not found', () => {
        expect(formatPrice(mockPrices, 'EUR')).toBe('');
    });
});

describe('getTotalPrice utility', () => {
    const mockProducts = [
        { price: [{ value: 50, symbol: 'USD', isDefault: 0 }, { value: 1350, symbol: 'UAH', isDefault: 1 }] },
        { price: [{ value: 150, symbol: 'USD', isDefault: 0 }, { value: 4050, symbol: 'UAH', isDefault: 1 }] },
        { price: [] }, // Product with no prices
    ];

    it('should correctly calculate total for USD', () => {
        expect(getTotalPrice(mockProducts, 'USD')).toBe('200 $');
    });

    it('should correctly calculate total for UAH', () => {
        expect(getTotalPrice(mockProducts, 'UAH')).toBe('5 400 UAH'); // toLocaleString('uk-UA') adds non-breaking space
    });

    it('should handle empty product list', () => {
        expect(getTotalPrice([], 'USD')).toBe('0 $');
    });
});
