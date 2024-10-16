'use client'

import { useAppDispatch, useAppSelector } from '@/_hooks/useApp'
import { Checkbox } from '@/_shared/Checkbox/Checkbox'
import { Label } from '@/_shared/Label/Label'
import { IMultipleChoice, setUpdatedValue } from '@/_store/slices/formTest'
import { getQuestionData } from '@/app/_lib/testData'

interface IMultiAnswerForm {
  questionId: string
}

export default function MultiAnswerForm({ questionId }: IMultiAnswerForm) {
  const formTest = useAppSelector((state) => state.formTest.value)
  const dispatch = useAppDispatch()
  const questionData = getQuestionData(questionId)
  if (!questionData) return <div>There is no such question</div>
  return (
    <div className="flex flex-col gap-2">
      {questionData.answerOptions?.map((answerOption) => (
        <div key={answerOption} className="flex gap-2">
          <Checkbox
            value={answerOption}
            id={answerOption}
            checked={
              (formTest[questionData.id] as IMultipleChoice)[answerOption]
            }
            onCheckedChange={(value) => {
              const questionDataState = formTest[
                questionData.id
              ] as IMultipleChoice
              const newAnswer = { ...questionDataState }
              newAnswer[answerOption] = value as boolean
              dispatch(
                setUpdatedValue({
                  key: questionData.id,
                  value: newAnswer,
                })
              )
            }}
          />
          <Label htmlFor={answerOption}>{answerOption}</Label>
        </div>
      ))}
    </div>
  )
}
