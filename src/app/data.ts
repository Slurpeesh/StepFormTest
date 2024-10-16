type QuestionType = 'single' | 'multi' | 'shortAnswer' | 'longAnswer'

export interface IQuestion {
  id: string
  question: string
  type: QuestionType
  answerOptions?: Array<string>
}

export const testData: Array<IQuestion> = [
  {
    id: '303201321',
    question: 'First question',
    type: 'single',
    answerOptions: [
      'HTML, CSS and JavaScript',
      'Kotlin, PHP and JavaScript',
      'PHP, HTML and CSS',
    ],
  },
  {
    id: '21214214',
    question: 'Second question',
    type: 'single',
    answerOptions: ['First option', 'Second option'],
  },
  {
    id: '34124124',
    question: 'Third question',
    type: 'multi',
    answerOptions: ['First option', 'Second option', 'Third option'],
  },
  {
    id: '4414214',
    question: 'Fourth question',
    type: 'shortAnswer',
  },
  {
    id: '5421412',
    question: 'Fifth question',
    type: 'longAnswer',
  },
]
