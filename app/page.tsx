'use client';
import ScatterChart from "@/components/charts/scatterplot"
import LineChart from "@/components/charts/linechart";

import PageTitle from "@/components/text/title"
import USSpellingData from '@/data/us_spellings.json'
import UKSpellingData from '@/data/uk_spellings.json'
import Button from "@/components/input/button";
import { useState } from "react";
import TextBox from "@/components/input/textbox";
import Form from "@/components/input/form";
import { FormData } from "@/components/functions";

/*
export const metadata = {
    title: "Spelling Viewer",
    description: "British vs American English spelling viewer."
}
*/

function smooth(array: number[], amount: number = 1): number[] {
    if (amount === 0) {
        return array;
    }


    const result = array.map((e, index) => {
        if (index === 0 || index + 1 === array.length) {
            return e;
        }
        return (e + array[index + 1] + array[index - 1]) / 3;
    })

    return smooth(result, amount - 1);
}

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
});

const scatter_data = us_spellings[0].timeseries.map((_, i) => {
    return us_smoothed.map((e1, index) => {
        const e2 = uk_smoothed[index];
        return {x: e1.timeseries[i], y: e2.timeseries[i]};
    });
});

export default function Home() {
    const [year, setYear] = useState(1700);
    const [wordIndex, setWordIndex] = useState(0);

    const data = new FormData();

    const words = us_smoothed.map((e1, index) => {
        const e2 = uk_smoothed[index];
        return `${e1.ngram} / ${e2.ngram}`;
    });

    function updateWord() {
        const newWordIndex = us_smoothed.findIndex((e1, index) => {
            const e2 = uk_smoothed[index];
            return e1.ngram === data.word || e2.ngram === data.word;
        });

        console.log(newWordIndex)

        if (newWordIndex !== -1) {
            setWordIndex(newWordIndex);
        }
    }

    return (
        <div className="h-full">
            <PageTitle>English Spelling Viewer</PageTitle>

            <div className="flex w-full">
                <div className="w-1/2 p-2">
                    <div>
                    </div>
                    <div className="flex">
                        <Button onClick={() => setYear(Math.max(1700, year - 1))}>{'\u2190 Previous Year'}</Button>
                        <Button onClick={() => setYear(Math.min(2019, year + 1))}>{'Next Year \u2192'}</Button>
                    </div>
                    <ScatterChart 
                        data={scatter_data[year - 1700]}
                        labels={words}
                        title={`Year: ${year}`}
                    />
                </div>
                <div className="w-1/2 p-2">
                    <div className="flex">
                        <Button onClick={() => setWordIndex(Math.max(0, wordIndex - 1))}>{'\u2190 Previous Word'}</Button>
                        <Button onClick={() => setWordIndex(Math.min(uk_spellings.length, wordIndex + 1))}>{'Next Word \u2192'}</Button>
                    </div>
                    <LineChart
                        data1={us_smoothed[wordIndex].timeseries}
                        data2={uk_smoothed[wordIndex].timeseries}
                        title={words[wordIndex]}
                    />
                    <Form buttonText="Get Word" data={data} action={updateWord} className='flex' buttonStyle="w-1/4">
                        <TextBox id='word' className='w-3/4'>Enter a Word</TextBox>
                    </Form>
                </div>
            </div>

            <div className="border-t-2 border-gray-600 absolute left-8 right-8 bottom-0 p-2">
                <h1 className="align-middle text-center text-xl text-gray-500 font-normal p-1 m-0">
                    Data Gathered from the Google NGram API
                    <br/>Visualizations by Cody Harding and Thomas Ayoub-Winder
                </h1>
            </div>
        </div>
    )
}