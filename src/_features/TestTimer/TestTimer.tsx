'use client'

import { useAppDispatch } from '@/_hooks/useApp'
import { setInitValue } from '@/_store/slices/formTest'
import { formatTime } from '@/app/_lib/timer'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface ITestTimer {
  initialTime: number
}

export default function TestTimer({ initialTime }: ITestTimer) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const timeLeftLocalStorage = localStorage.getItem('timeLeft')
  const [timeLeft, setTimeLeft] = useState(
    timeLeftLocalStorage ? Number(timeLeftLocalStorage) : initialTime
  )
  const timerRef = useRef(timeLeft)

  useEffect(() => {
    timerRef.current = timeLeft
  }, [timeLeft])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timerRef.current > 0) {
        setTimeLeft((prev) => {
          const nextVal = prev - 1
          localStorage.setItem('timeLeft', nextVal.toString())
          return nextVal
        })
      } else {
        clearInterval(intervalId)
        alert('Answers submitted')
        dispatch(setInitValue())
        localStorage.removeItem('timeLeft')
        router.push('/')
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [dispatch, router])

  return (
    <p className="border-[1px] border-black rounded-sm px-3">
      {formatTime(timeLeft)}
    </p>
  )
}
