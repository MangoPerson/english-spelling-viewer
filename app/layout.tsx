import '../app/globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className='bg-zinc-900'>
                <div className='mx-0 lg:mx-8'>
                    {children}
                </div>
            </body>
        </html>
    )
}