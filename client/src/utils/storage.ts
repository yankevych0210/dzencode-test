// Small utility to safely read and write from localStorage
// Used for persisting UI state across page reloads (language, filter, etc.)

const PREFIX = 'inventory_';

export const storage = {
    get<T>(key: string, fallback: T): T {
        try {
            const raw = localStorage.getItem(PREFIX + key);
            return raw !== null ? (JSON.parse(raw) as T) : fallback;
        } catch {
            return fallback;
        }
    },

    set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(PREFIX + key, JSON.stringify(value));
        } catch {
            // Storage might be full or unavailable — silently fail
        }
    },

    remove(key: string): void {
        localStorage.removeItem(PREFIX + key);
    },
};
