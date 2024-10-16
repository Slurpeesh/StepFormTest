import TestTimer from '@/_features/TestTimer/TestTimer'
import TabPagination from '@/_widgets/TabPagination/TabPagination'

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="p-5 w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <h1 className="font-bold text-3xl">Testing</h1>
          <TestTimer initialTime={30} />
        </div>
        <TabPagination />
        {children}
      </div>
    </main>
  )
}
