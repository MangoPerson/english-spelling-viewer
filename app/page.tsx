import Title from "@/components/text/title"

export const metadata = {
    title: "Spelling Viewer",
    description: "British vs American English spelling viewer."
}

const datasets = [
    {
        label: "Set 1",
        data: [1, 2, 3, 2, 3, 2, 1]
    }
]

export default function Home() {
    return (
        <>
            <Title>English Spelling Viewer</Title>
            <div>
                
            </div>
            <footer className="border-t-2 border-gray-600 absolute left-8 right-8 bottom-0 p-2">
                <h1 className=" align-middle text-center text-xl text-gray-500 font-normal p-1 m-0">Data Gathered from the Google NGram API</h1>
                <h1 className=" align-middle text-center text-xl text-gray-500 font-normal p-1 m-0">Visualization by Cody Harding and Thomas Ayoub-Winder</h1>
            </footer>
        </>
    )
}