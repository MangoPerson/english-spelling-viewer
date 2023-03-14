'use client';
import ScatterChart from "@/components/charts/scatterplot"
import LineChart from "@/components/charts/linechart";

import PageTitle from "@/components/text/title"
import USSpellingData from '@/data/us_spellings.json'
import UKSpellingData from '@/data/uk_spellings.json'
import Button from "@/components/input/button";
import { useEffect, useState } from "react";
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

function zip<A, B>(array1: A[], array2: B[]) {
    const result: [A, B][] = array1.map((a, index) => {
        const b = array2[index];
        return [a, b];
    });
    return new Zip(result);
}

class Zip<A, B> {
    values: [A, B][];

    constructor(values: [A, B][]) {
        this.values = values;
    }

    filter(predicate: (a: A, b: B, index: number) => boolean, inPlace = true) {
        if (inPlace) {
            this.values = this.values.filter((e, index) => predicate(e[0], e[1], index));
            return this;
        }
        else {
            const result = this.values.filter((e, index) => predicate(e[0], e[1], index));
            return new Zip(result);
        }
    }

    findIndex(predicate: (a: A, b: B, index: number) => boolean) {
        return this.values.findIndex((e, index) => predicate(e[0], e[1], index));
    }

    map(callback: (a: A, b: B, index: number) => any) {
        return this.values.map((e, index) => callback(e[0], e[1], index));
    }

    getLists() {
        return [
            this.map((a, _) => a),
            this.map((_, b) => b)
        ]
    }
}

type Word = {ngram: string, timeseries: number[]}

const us_spellings = USSpellingData as Word[];
const uk_spellings = UKSpellingData as Word[];

const cutoff = 1e-4;

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

let filtered = zip(us_smoothed, uk_smoothed);

const words = zip(us_spellings, uk_spellings).map((a, b) => {
    return `${a.ngram} / ${b.ngram}`;
});

function lineGraphOf(word: string | number) {
    const index = (typeof word === 'number') ? 
        word :
        zip(us_spellings, uk_spellings).findIndex((a, b) => {
            return a.ngram === word || b.ngram === word;
        });

    if (index === -1) return;

    return (
        <LineChart
            data1={us_smoothed[index].timeseries}
            data2={uk_smoothed[index].timeseries}
            title={`Word #${index}: ${words[index]}`}
        />
    )
}

export default function Home() {
    const [year, setYear] = useState(1700);
    const [wordIndex, setWordIndex] = useState(0);
    const [checked, setChecked] = useState(false);
    const [scatterData, setScatterData] = useState(us_spellings[0].timeseries.map((_, i) => {
        return filtered.map((a, b) => {
            return {x: a.timeseries[i], y: b.timeseries[i]};
        });
    }));
    const [wordsFiltered, setWordsFiltered] = useState(filtered.map((a, b) => {
        return `${a.ngram} / ${b.ngram}`;
    }));

    const wordFormData = new FormData();
    const filterFormData = new FormData();

    function updateWord() {
        const word = wordFormData.word.toLowerCase();

        const newIndex = zip(us_spellings, uk_spellings).findIndex((a, b) => {
            return a.ngram === word || b.ngram === word;
        });

        console.log(newIndex)

        if (newIndex === -1) {
            return;
        }

        setWordIndex(newIndex);

        console.log(Math.max(...us_smoothed[newIndex].timeseries).toExponential(4));
        console.log(Math.max(...uk_smoothed[newIndex].timeseries).toExponential(4));
    }

    function updateFilter() {
        const usFilter = filterFormData.us.toLowerCase();
        const ukFilter = filterFormData.uk.toLowerCase();

        filtered = zip(us_smoothed, uk_smoothed).filter((a, b) => {
            return a.ngram.includes(usFilter) && b.ngram.includes(ukFilter); 
        });

        setScatterData(us_spellings[0].timeseries.map((_, i) => {
            return filtered.map((a, b) => {
                return {x: a.timeseries[i], y: b.timeseries[i]};
            });
        }));

        setWordsFiltered(filtered.map((a, b) => {
            return `${a.ngram} / ${b.ngram}`;
        }));

        console.log(scatterData[0].length)
    }

    return (
        <div className="h-auto overflow-y-scroll">
            <PageTitle>English Spelling Viewer</PageTitle>

            <div className="flex flex-col lg:grid w-full lg:grid-cols-2">
                <div className="w-full p-2">
                    <div className="flex">
                        <Button onClick={() => setYear(Math.max(1700, year - 1))}>{'\u2190 Previous Year'}</Button>
                        <Button onClick={() => setYear(Math.min(2019, year + 1))}>{'Next Year \u2192'}</Button>
                    </div>
                    <ScatterChart 
                        data={scatterData[year - 1700]}
                        labels={wordsFiltered}
                        title={`Year: ${year}`}
                    />
                    <Form buttonText="Filter" data={filterFormData} action={updateFilter} className='flex' buttonStyle="w-1/3">
                        <TextBox id='us' className='w-2/3'>American Spelling Contains</TextBox>
                        <div className="border-2 border-neutral-200 rounded-lg w-12 h-12 py-2.5 font-bold">
                            AND
                        </div>
                        <TextBox id='uk' className='w-2/3'>British Spelling Contains</TextBox>
                    </Form>
                </div>
                <div className="w-full p-2">
                    <div className="flex align-middle">
                        <Button onClick={() => setWordIndex(Math.max(0, wordIndex - 1))}>{'\u2190 Previous Word'}</Button>
                        <Button onClick={() => setWordIndex(Math.min(uk_spellings.length, wordIndex + 1))}>{'Next Word \u2192'}</Button>
                    </div>
                    <LineChart
                        data1={checked ?
                            zip(us_smoothed[wordIndex].timeseries, uk_smoothed[wordIndex].timeseries).map((a, b) => a / (a + b)) :
                            us_smoothed[wordIndex].timeseries
                        }
                        data2={checked ?
                            zip(us_smoothed[wordIndex].timeseries, uk_smoothed[wordIndex].timeseries).map((a, b) => b / (a + b)) :
                            uk_smoothed[wordIndex].timeseries
                        }
                        title={`Word #${wordIndex}: ${words[wordIndex]}`}
                    />
                    <Form buttonText="Get Word" data={wordFormData} action={updateWord} className='flex' buttonStyle="w-1/3">
                        <TextBox id='word' className='w-2/3'>Enter a Word</TextBox>
                    </Form>
                </div>
            </div>

            <PageTitle className="text-xl md:text-xl lg:text-xl">Some examples</PageTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 w-full">
                {[
                    'color', 
                    'flavor', 
                    'labor',
                    'fiber',
                    'meter',
                    'caliber',
                    'drafts',
                    'almanacks',
                    'anglicize'
                ].map((e, index) => (
                    <div className="w-full p-2" key={index}>
                        {lineGraphOf(e)}
                    </div>
                ))}
            </div>
        </div>
    )
}