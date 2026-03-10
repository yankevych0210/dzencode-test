import { formatShort, formatLong, formatClock } from '../formatDate';

jest.mock('date-fns/locale', () => ({
    uk: {}
}));

jest.mock('date-fns', () => ({
    format: (d: any, formatStr: string) => {
        if (formatStr === 'dd / MM / yyyy') return '29 / 06 / 2017';
        if (formatStr === 'dd') return '29';
        if (formatStr === 'LLL') return 'черв';
        if (formatStr === 'yyyy') return '2017';
        if (formatStr === 'HH:mm') return '14:35';
        if (formatStr === 'EEEE') return 'четвер';
        return 'mocked_date';
    }
}));

describe('formatDate utilities', () => {
    const testDate = '2017-06-29 12:09:33';

    it('formatShort returns DD / MM / YYYY', () => {
        const result = formatShort(testDate);
        expect(result).toMatch(/^\d{2} \/ \d{2} \/ \d{4}$/);
        expect(result).toBe('29 / 06 / 2017');
    });

    it('formatLong returns DD / Mon / YYYY with Ukrainian month', () => {
        const result = formatLong(testDate);
        // Should contain year and day
        expect(result).toContain('2017');
        expect(result).toContain('29');
        // Should not have just numbers — has month name
        expect(result).toMatch(/\d{2} \/ [А-Яа-яІіЇїЄєҐґ]+\.? \/ \d{4}/);
    });

    it('formatClock returns HH:MM', () => {
        const date = new Date('2017-06-29T14:35:00');
        const result = formatClock(date);
        expect(result).toMatch(/^\d{2}:\d{2}$/);
    });
});
