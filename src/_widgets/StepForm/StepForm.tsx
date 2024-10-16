'use client'

import LongAnswerForm from '@/_features/LongAnswerForm/LongAnswerForm'
import MultiAnswerForm from '@/_features/MultiAnswerForm/MultiAnswerForm'
import ShortAnswerForm from '@/_features/ShortAnswerForm/ShortAnswerForm'
import SingleAnswerForm from '@/_features/SingleAnswerForm/SingleAnswerForm'
import { useAppDispatch } from '@/_hooks/useApp'
import { setInitValue } from '@/_store/slices/formTest'
import { IQuestion, testData } from '@/app/data'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface IStepForm {
  questionData: IQuestion
  currentQuestionIndex: number
}

export default function StepForm({
  questionData,
  currentQuestionIndex,
}: IStepForm) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isLastQuestion = currentQuestionIndex === testData.length - 1
  function submitAnswers(e: FormEvent) {
    e.preventDefault()
    alert('Answers submitted')
    dispatch(setInitValue())
    localStorage.removeItem('timeLeft')
    router.push('/')
  }
  return (
    <form onSubmit={(e) => submitAnswers(e)} className="flex flex-col gap-5">
      {questionData.type === 'single' && (
        <SingleAnswerForm questionId={questionData.id} />
      )}
      {questionData.type === 'multi' && (
        <MultiAnswerForm questionId={questionData.id} />
      )}
      {questionData.type === 'shortAnswer' && (
        <ShortAnswerForm questionId={questionData.id} maxLength={30} />
      )}
      {questionData.type === 'longAnswer' && (
        <LongAnswerForm questionId={questionData.id} />
      )}
      {isLastQuestion ? (
        <button
          type="submit"
          className="bg-rose-700 w-fit text-white p-1 px-6 text-center rounded-md hover:bg-rose-600 transition-colors"
        >
          Submit
        </button>
      ) : (
        <Link
          href={`/test_/${testData[currentQuestionIndex + 1].id}`}
          className="bg-rose-700 w-fit text-white p-1 px-6 text-center rounded-md hover:bg-rose-600 transition-colors"
        >
          Answer
        </Link>
      )}
    </form>
  )
}
