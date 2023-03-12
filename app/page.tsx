'use client';
import ScatterChart from "@/components/charts/scatterplot"
import LineChart from "@/components/charts/linechart";

import PageTitle from "@/components/text/title"
import USSpellingData from '@/data/us_spellings.json'
import UKSpellingData from '@/data/uk_spellings.json'
import Button from "@/components/input/button";
import { useState } from "react";
import { randomInt } from "crypto";

/*
export const metadata = {
    title: "Spelling Viewer",
    description: "British vs American English spelling viewer."
}
*/

type Word = {ngram: string, timeseries: number[]}

const us_spellings = USSpellingData as Word[];
const uk_spellings = UKSpellingData as Word[];

const us_smoothed = us_spellings.map(e => {
    return {
        ngram: e.ngram,
        timeseries: smooth(e.timeseries, 20)
    }
});

const uk_smoothed = uk_spellings.map(e => {
    return {
        ngram: e.ngram,
        timeseries: smooth(e.timeseries, 20)
    }
})

function smooth(array: number[], amount: number = 1): number[] {
    if (amount == 0) {
        return array;
    }

    const result = array.map((e, index) => {
        if (index == 0 || index + 1 == array.length) {
            return e;
        }
        return (e + array[index + 1] + array[index - 1]) / 3;
    })

    return smooth(result, amount - 1);
}

export default function Home() {
    const [year, setYear] = useState(1700);
    const [word, setWord] = useState(0);

    const datapoints = us_smoothed.map((e1, index) => {
        const e2 = uk_smoothed[index]
        return {x: e1.timeseries[year - 1700], y: e2.timeseries[year - 1700]}
    });

    const words = us_smoothed.map((e1, index) => {
        const e2 = uk_smoothed[index]
        return `${e1.ngram} / ${e2.ngram}`
    });

    return (
        <div className="h-full">
            <PageTitle>English Spelling Viewer</PageTitle>

            <div className="flex w-full border-2">
                <div className="w-1/2">
                    <div className="flex">
                        <Button onClick={() => setYear(Math.max(1700, year - 1))} className='w-32'>Previous Year</Button>
                        <Button onClick={() => setYear(Math.min(2019, year + 1))} className='w-32'>Next Year</Button>
                    </div>
                    <ScatterChart 
                        data={datapoints}
                        labels={words}
                        title={`Year: ${year}`}
                    />
                </div>
                <div className="w-1/2">
                    <div className="flex">
                        <Button onClick={() => setWord(Math.max(0, word - 1))} className='w-32'>Previous Word</Button>
                        <Button onClick={() => setWord(Math.min(uk_spellings.length, word + 1))} className='w-32'>Next Word</Button>
                    </div>
                    <LineChart
                        data1={us_smoothed[word].timeseries}
                        data2={uk_smoothed[word].timeseries}
                        title={words[word]}
                    />
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