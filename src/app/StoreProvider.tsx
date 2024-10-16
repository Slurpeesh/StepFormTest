'use client'

import {
  IFormTest,
  IMultipleChoice,
  setFormTest,
} from '@/_store/slices/formTest'
import { AppStore, makeStore } from '@/_store/store'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { testData } from './data'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    let formTest: IFormTest | string | null
    formTest = localStorage.getItem('formTest')
    if (formTest) {
      storeRef.current!.dispatch(setFormTest(JSON.parse(formTest)))
    } else {
      formTest = {}
      for (const question of testData) {
        const key = question.id
        let value: IMultipleChoice | string
        switch (question.type) {
          case 'multi':
            value = {}
            if (question.answerOptions === undefined) {
              throw new Error(
                'Data for multiple choice must include answerOptions'
              )
            }
            for (const answerOption of question.answerOptions) {
              value[answerOption] = false
            }
            break
          default:
            value = ''
        }
        formTest[key] = value
      }
      storeRef.current!.dispatch(setFormTest(formTest))
    }
  }, [])

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  if (!isClient) {
    return null
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
