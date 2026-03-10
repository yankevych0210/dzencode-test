// Web Worker for processing chart data

// We define the types here directly to avoid complex imports in the worker
interface Price {
    value: number;
    symbol: string;
    isDefault: number;
}

interface Product {
    id: number;
    price: Price[];
}

interface Order {
    id: number;
    title: string;
    products: Product[];
}

interface ChartEntry {
    name: string;
    USD: number;
    UAH: number;
    products: number;
}

// eslint-disable-next-line
const ctx: Worker = self as any;

ctx.onmessage = (e: MessageEvent<Order[]>) => {
    const orders = e.data;

    // Process the data (mock heavy calculation)
    const result: ChartEntry[] = orders.map(order => {
        const products = order.products ?? [];
        const totals = products.reduce(
            (acc, p) => {
                const usd = p.price?.find(pr => pr.symbol === 'USD')?.value ?? 0;
                const uah = p.price?.find(pr => pr.symbol === 'UAH')?.value ?? 0;
                return { usd: acc.usd + usd, uah: acc.uah + uah };
            },
            { usd: 0, uah: 0 }
        );

        return {
            name: order.title.length > 22 ? order.title.slice(0, 22) + '…' : order.title,
            USD: totals.usd,
            UAH: totals.uah,
            products: products.length,
        };
    });

    // Send processed data back to main thread
    ctx.postMessage(result);
};

export { };
