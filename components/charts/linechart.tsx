'use client';
import React from 'react';
import { Line, Scatter } from 'react-chartjs-2';

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

export const options = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export default function Graph({data}: {data: number[][]}) {
    const gdata = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: data.map((e) => {
                return {x: e[0], y: e[1]}
            }),
            backgroundColor: 'rgb(20, 155, 20)'
          },
        ],
    };

    return <Scatter className='border-2' data={gdata} options={options}/>
}