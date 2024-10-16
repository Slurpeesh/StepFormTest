import { testData } from '../data'

export function getQuestionData(id: string) {
  return testData.find((question) => question.id === id)
}
