'use client'

import { useAppDispatch, useAppSelector } from '@/_hooks/useApp'
import { Textarea, TextareaProps } from '@/_shared/Textarea/Textarea'
import { setUpdatedValue } from '@/_store/slices/formTest'
import { getQuestionData } from '@/app/_lib/testData'

interface ILongAnswerForm extends TextareaProps {
  questionId: string
}

export default function LongAnswerForm({
  questionId,
  ...rest
}: ILongAnswerForm) {
  const formTest = useAppSelector((state) => state.formTest.value)
  const dispatch = useAppDispatch()
  const questionData = getQuestionData(questionId)
  if (!questionData) return <div>There is no such question</div>
  return (
    <Textarea
      onChange={(e) =>
        dispatch(
          setUpdatedValue({
            key: questionData.id,
            value: e.currentTarget.value,
          })
        )
      }
      value={formTest[questionData.id] as string}
      placeholder="Type your answer here"
      {...rest}
    />
  )
}
