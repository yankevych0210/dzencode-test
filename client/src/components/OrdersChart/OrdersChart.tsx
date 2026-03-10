import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from 'recharts';
import { Order } from '../../types';
import './OrdersChart.css';

interface Props {
    orders: Order[];
}

interface ChartEntry {
    name: string;
    USD: number;
    UAH: number;
    products: number;
}

const buildChartData = (orders: Order[]): ChartEntry[] =>
    orders.map(order => {
        const orderProducts = order.products?.filter(p => p.order === order.id) ?? [];
        const totals = orderProducts.reduce(
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
            products: orderProducts.length,
        };
    });

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="orders-chart__tooltip">
            <p className="orders-chart__tooltip-label">{label}</p>
            {payload.map((entry: any) => (
                <p key={entry.dataKey} style={{ color: entry.fill || entry.color || '#333' }}>
                    {entry.name}: {entry.value.toLocaleString()} {entry.dataKey === 'USD' ? '$' : 'UAH'}
                </p>
            ))}
        </div>
    );
};

const OrdersChart: React.FC<Props> = ({ orders }) => {
    const data = useMemo(() => buildChartData(orders), [orders]);

    if (orders.length === 0 || data.length === 0) return null;

    return (
        <div className="orders-chart">
            <h3 className="orders-chart__title">Сумма приходов</h3>
            <div className="orders-chart__wrap">
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#999' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#999' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                        <Bar dataKey="USD" fill="#5fb346" radius={[4, 4, 0, 0]} name="USD $" />
                        <Bar dataKey="UAH" fill="#b5d99c" radius={[4, 4, 0, 0]} name="UAH" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="orders-chart__summary">
                {orders.map(order => {
                    const orderProductsCount = order.products?.filter(p => p.order === order.id).length ?? 0;
                    return (
                        <div key={order.id} className="orders-chart__row">
                            <span className="orders-chart__row-name">{order.title}</span>
                            <span className="orders-chart__row-count">{orderProductsCount} прод.</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrdersChart;
