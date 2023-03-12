'use client';
import React from 'react';
import { Scatter } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
  
export default function Graph({
    data,
    labels,
    title
}: {
    data: {x: number, y: number}[],
    labels: string[]
    title?: string
}) {
    const gdata = {
        datasets: [
          {
            label: 'Dataset 1',
            data: data,
            backgroundColor: 'rgb(20, 155, 20)'
          },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 28
                },
                color: 'rgb(220, 220, 220)'
            },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => {
                        const label = labels[ctx.dataIndex];
                        return `${label}: ${ctx.parsed.x.toExponential(3)}, ${ctx.parsed.y.toExponential(3)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: (value: any) => {
                        return value.toExponential(1);
                    }
                }
            },
            y: {
                ticks: {
                    callback: (value: any) => {
                        return value.toExponential(1);
                    }
                }
            }
        }
    };

    return <Scatter data={gdata} options={options}/>
}