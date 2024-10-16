'use client'

import { useAppDispatch, useAppSelector } from '@/_hooks/useApp'
import { Label } from '@/_shared/Label/Label'
import { RadioGroup, RadioGroupItem } from '@/_shared/RadioGroup/RadioGroup'
import { setUpdatedValue } from '@/_store/slices/formTest'
import { getQuestionData } from '@/app/_lib/testData'

interface ISingleAnswerForm {
  questionId: string
}

export default function SingleAnswerForm({ questionId }: ISingleAnswerForm) {
  const formTest = useAppSelector((state) => state.formTest.value)
  const dispatch = useAppDispatch()
  const questionData = getQuestionData(questionId)
  if (!questionData) return <div>There is no such question</div>
  return (
    <RadioGroup
      onValueChange={(value) =>
        dispatch(setUpdatedValue({ key: questionData.id, value }))
      }
      value={formTest[questionData.id] as string}
    >
      {questionData.answerOptions?.map((answerOption) => (
        <div key={answerOption} className="flex gap-2">
          <RadioGroupItem value={answerOption} id={answerOption} />
          <Label htmlFor={answerOption}>{answerOption}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
