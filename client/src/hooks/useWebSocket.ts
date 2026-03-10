import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create a singleton instance completely outside the React lifecycle
// This guarantees we only ever open 1 socket connection per browser tab,
// even if React Strict Mode double-mounts or hot-reloads the component 200 times.
const globalSocket: Socket = io(SOCKET_URL, {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
});

export const useWebSocket = () => {
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        const handleSessionCount = (count: number) => {
            setSessionCount(count);
        };

        globalSocket.on('sessionCount', handleSessionCount);

        // Cleanup listener on unmount, but do NOT disconnect the global socket!
        return () => {
            globalSocket.off('sessionCount', handleSessionCount);
        };
    }, []);

    return { sessionCount };
};
