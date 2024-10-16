import Link from 'next/link'
import { testData } from './data'

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Link
        href={`/test_/${testData[0].id}`}
        className="bg-red-500 p-5 text-xl font-semibold rounded-lg hover:bg-red-400 transition-colors"
      >
        Start Test
      </Link>
    </main>
  )
}
