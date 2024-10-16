import { testData } from '@/app/data'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IMultipleChoice {
  [key: string]: boolean
}

export interface IFormTest {
  [key: string]: string | IMultipleChoice
}

const initialValue: IFormTest = {}
for (const question of testData) {
  const key = question.id
  let value: IMultipleChoice | string
  switch (question.type) {
    case 'multi':
      value = {}
      if (question.answerOptions === undefined) {
        throw new Error('Data for multiple choice must include answerOptions')
      }
      for (const answerOption of question.answerOptions) {
        value[answerOption] = false
      }
      break
    default:
      value = ''
  }
  initialValue[key] = value
}

export interface IFormTestState {
  value: IFormTest
}

const initialState: IFormTestState = {
  value: initialValue,
}

export const formTestSlice = createSlice({
  name: 'formTest',
  initialState,
  reducers: {
    setFormTest: (state, action: PayloadAction<IFormTest>) => {
      state.value = action.payload
      localStorage.setItem('formTest', JSON.stringify(action.payload))
    },
    setUpdatedValue: (
      state,
      action: PayloadAction<{
        key: keyof IFormTest
        value: string | IMultipleChoice
      }>
    ) => {
      state.value[action.payload.key] = action.payload.value
      const formTest: IFormTest = JSON.parse(localStorage.getItem('formTest')!)
      formTest[action.payload.key] = action.payload.value
      localStorage.setItem('formTest', JSON.stringify(formTest))
    },
    setInitValue: (state) => {
      state.value = initialValue
      localStorage.setItem('formTest', JSON.stringify(initialValue))
    },
  },
})

export const { setFormTest, setUpdatedValue, setInitValue } =
  formTestSlice.actions
export const selectFormTest = (state: RootState) => state.formTest.value
export default formTestSlice.reducer
