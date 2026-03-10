import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

// Format: 04 / 12 / 2017  (day / month number / year)
export const formatShort = (dateStr: string): string => {
    const date = new Date(dateStr);
    return format(date, 'dd / MM / yyyy');
};

// Format: 06 / Апр / 2017 (with Ukrainian month names)
export const formatLong = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = format(date, 'dd');
    const month = format(date, 'LLL', { locale: uk });
    const year = format(date, 'yyyy');
    const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} / ${monthCapitalized} / ${year}`;
};

// Real-time clock
export const formatClock = (date: Date): string => {
    return format(date, 'HH:mm');
};

// Day of week + full date for TopMenu
export const formatTopMenuDate = (date: Date): string => {
    const dayName = format(date, 'EEEE', { locale: uk });
    const dayCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    const dayNum = format(date, 'dd');
    const month = format(date, 'LLL', { locale: uk });
    const monthCap = month.charAt(0).toUpperCase() + month.slice(1);
    const year = format(date, 'yyyy');
    return `${dayCapitalized} ${dayNum} ${monthCap}, ${year}`;
};
