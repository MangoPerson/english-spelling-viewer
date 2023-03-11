import '../app/globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
                <body>
                    <div className='bg-zinc-900 fixed top-0 bottom-0 right-0 left-0 p-8'>
                        {children}
                    </div>
            </body>
        </html>
    )
}