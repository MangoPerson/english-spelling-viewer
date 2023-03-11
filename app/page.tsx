import LineChart from "@/components/charts/linechart"
import PageTitle from "@/components/text/title"
import { Line } from "react-chartjs-2"
import USSpellingData from '@/data/us_spellings.json'
import UKSpellingData from '@/data/uk_spellings.json'

export const metadata = {
    title: "Spelling Viewer",
    description: "British vs American English spelling viewer."
}

type Word = {ngram: string, timeseries: number[]}

export default function Home() {
    const us_spellings = USSpellingData as Word[];
    const uk_spellings = UKSpellingData as Word[];

    return (
        <div className="h-full">
            <PageTitle>English Spelling Viewer</PageTitle>
            <div className="border-2 border-red-500 h-4/5">
                <LineChart data={us_spellings.map((e1, index) => {
                    const e2 = uk_spellings[index];
                    console.log(e1.ngram, e2.ngram);
                    return [e1.timeseries[200], e2.timeseries[200]]
                })}/>
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