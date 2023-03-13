import Head from "next/head";

export default function Title({
    children, 
    className 
} : { 
    children: any, 
    className?: string
}) {
    return (
        <>
            <Head>
                {children}
            </Head>
            <div className={"align-middle text-neutral-300 font-bold p-4 text-center text-2xl md:text-6xl lg:text-7xl " + className}>
                <h1>{children}</h1>
            </div>
        </>
    )
}