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
            <div className={"align-middle text-neutral-300 font-bold text-8xl text-center p-4 " + className}>
                <h1>{children}</h1>
            </div>
        </>
    )
}