'use client'

import { useAppSelector } from '@/_hooks/useApp'
import { cn } from '@/app/_lib/utils'
import { testData } from '@/app/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabPagination() {
  const formTest = useAppSelector((state) => state.formTest.value)
  const pathName = usePathname()
  const pathNameId = pathName.match(/\/test_\/(.*)/)![1]
  return (
    <ul className="flex gap-1 gap-y-4 flex-wrap">
      {testData.map((question) => (
        <Link
          key={question.id}
          href={`/test_/${question.id}`}
          className={cn('bg-gray-300 h-2 w-12', {
            'bg-black':
              (question.type !== 'multi' && formTest[question.id]) ||
              (question.type === 'multi' &&
                Object.values(formTest[question.id]).some((value) => value)),
            'bg-rose-700': question.id === pathNameId,
          })}
        />
      ))}
    </ul>
  )
}
