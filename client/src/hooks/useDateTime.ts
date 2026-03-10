import { useEffect, useState } from 'react';
import { formatClock, formatTopMenuDate } from '../utils/formatDate';

export const useDateTime = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return {
        date: formatTopMenuDate(now),
        time: formatClock(now),
    };
};
