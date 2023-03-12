'use client';
import React from 'react';
import {Scatter } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TooltipItem,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

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
            },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => {
                        const label = labels[ctx.dataIndex];
                        return `${label}: ${ctx.parsed.x.toExponential(3)}, ${ctx.parsed.y.toExponential(3)}`;
                    }
                }
            }
        }
    };

    return <Scatter data={gdata} options={options}/>
}