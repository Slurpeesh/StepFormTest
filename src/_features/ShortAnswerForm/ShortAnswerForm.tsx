'use client'

import { useAppDispatch, useAppSelector } from '@/_hooks/useApp'
import { Input, InputProps } from '@/_shared/Input/Input'
import { setUpdatedValue } from '@/_store/slices/formTest'
import { getQuestionData } from '@/app/_lib/testData'

interface IShortAnswerForm extends InputProps {
  questionId: string
}

export default function ShortAnswerForm({
  questionId,
  ...rest
}: IShortAnswerForm) {
  const formTest = useAppSelector((state) => state.formTest.value)
  const dispatch = useAppDispatch()
  const questionData = getQuestionData(questionId)
  if (!questionData) return <div>There is no such question</div>
  return (
    <Input
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
