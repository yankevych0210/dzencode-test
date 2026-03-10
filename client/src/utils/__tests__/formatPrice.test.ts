import { formatPrice, getTotalPrice } from '../formatPrice';
import { Price, Product } from '../../types';

const mockPrices: Price[] = [
    { value: 100, symbol: 'USD', isDefault: 0 },
    { value: 2600, symbol: 'UAH', isDefault: 1 },
];

describe('formatPrice', () => {
    it('formats USD price correctly', () => {
        expect(formatPrice(mockPrices, 'USD')).toBe('100 $');
    });

    it('formats UAH price correctly', () => {
        expect(formatPrice(mockPrices, 'UAH')).toBe('2 600 UAH');
    });

    it('returns empty string for unknown currency', () => {
        expect(formatPrice(mockPrices, 'EUR')).toBe('');
    });
});

describe('getTotalPrice', () => {
    const mockProducts = [
        {
            id: 1,
            price: [
                { value: 100, symbol: 'USD', isDefault: 0 },
                { value: 2600, symbol: 'UAH', isDefault: 1 },
            ],
        },
        {
            id: 2,
            price: [
                { value: 200, symbol: 'USD', isDefault: 0 },
                { value: 5200, symbol: 'UAH', isDefault: 1 },
            ],
        },
    ] as unknown as Product[];

    it('sums USD total across products', () => {
        const result = getTotalPrice(mockProducts, 'USD');
        expect(result).toContain('300');
    });

    it('sums UAH total across products', () => {
        const result = getTotalPrice(mockProducts, 'UAH');
        expect(result).toContain('7');
        expect(result).toContain('800');
    });

    it('returns zero for empty products', () => {
        expect(getTotalPrice([], 'USD')).toBe('0 $');
    });
});
