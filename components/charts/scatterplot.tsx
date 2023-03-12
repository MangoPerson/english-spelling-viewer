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

const options = {
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Scatter Plot',
    },
  },
};
  
export default function Graph({data}: {data: {x: number, y: number}[]}) {
    const gdata = {
        datasets: [
          {
            label: 'Dataset 1',
            data: data,
            backgroundColor: 'rgb(20, 155, 20)'
          },
        ],
    };

    return <Scatter className='border-2 w-96' data={gdata} options={options}/>
}