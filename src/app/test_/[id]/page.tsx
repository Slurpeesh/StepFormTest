import StepForm from '@/_widgets/StepForm/StepForm'
import { getQuestionData } from '@/app/_lib/testData'
import { testData } from '@/app/data'

export default function Test_({ params }: { params: { id: string } }) {
  const questionData = getQuestionData(params.id)
  const currentQuestionIndex = testData.findIndex(
    (question) => question.id === params.id
  )

  if (!questionData) return <div>There is no such question</div>

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-semibold">
        {currentQuestionIndex + 1}. {questionData?.question}
      </h2>
      <StepForm
        questionData={questionData}
        currentQuestionIndex={currentQuestionIndex}
      />
    </div>
  )
}
