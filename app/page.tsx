'use client';
import ScatterChart from "@/components/charts/scatterplot"

import PageTitle from "@/components/text/title"
import USSpellingData from '@/data/us_spellings.json'
import UKSpellingData from '@/data/uk_spellings.json'
import Button from "@/components/input/button";
import { useState } from "react";

/*
export const metadata = {
    title: "Spelling Viewer",
    description: "British vs American English spelling viewer."
}
*/

type Word = {ngram: string, timeseries: number[]}

export default function Home() {
    const [year, setYear] = useState(200);

    const us_spellings = USSpellingData as Word[];
    const uk_spellings = UKSpellingData as Word[];

    const datapoints = us_spellings.map((e1, index) => {
        const e2 = uk_spellings[index];
        return {x: e1.timeseries[year], y: e2.timeseries[year]}
    });

    const increaseYear = () => {
        setYear(year + 1);
        console.log(`Increased to ${year}.`)
    }
    const decreaseYear = () => {
        setYear(year - 1);
        console.log(`Decreased to ${year}.`) 
    }

    const word = 1;

    return (
        <div className="h-full">
            <PageTitle>English Spelling Viewer</PageTitle>
            <div className="h-96">
                <div className="flex border-2 h-16 text-white">
                    <Button onClick={decreaseYear} className='w-64'>Decrease Year</Button>
                    <Button onClick={increaseYear} className='w-64'>Increase Year</Button>
                    <p className=''>Year: {year}</p>
                </div>
                <div className="border-2 text-white h-96 flex">
                    <ScatterChart data={datapoints}/>
                </div>
            </div>
            <div className="border-2 border-gray-600 absolute left-8 right-8 bottom-0 p-2">
                <h1 className="align-middle text-center text-xl text-gray-500 font-normal p-1 m-0">
                    Data Gathered from the Google NGram API
                    <br/>Visualization by Cody Harding and Thomas Ayoub-Winder
                </h1>
            </div>
        </div>
    )
}