'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';

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

export default function LineChart({data1,
    data2,
    title
}: {
    data1: number[], 
    data2: number[], 
    title: string
}) {
    const options = {
        plugins: {
            legend: {
            position: 'top' as const,
            },
            title: {
                display: true,
                text: title
            }
        },
        scales: {
            y: {
                ticks: {
                    display: false
                }
            }
        }
    };
    
    const gdata = {
        labels: data1.map((_, index) => index + 1700),
        datasets: [
            {
                data: data1,
                borderColor: 'rgb(100, 100, 200)',
                backgroundColor: 'rgb(75, 75, 150)',
                spanGaps: true,
                label: 'American Spelling',
                pointRadius: 0,
                borderWidth: 1.5
            },
            {
                data: data2,
                borderColor: 'rgb(200, 100, 100)',
                backgroundColor: 'rgb(150, 75, 75)',
                spanGaps: true,
                label: 'British Spelling',
                pointRadius: 0,
                borderWidth: 1.5
            }
        ]
    }
    return <Line data={gdata} options={options} width={275}/>
}