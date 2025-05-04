import { Answers } from '@/constants'

export type CTTAnalysisResult = {
  [key: string]: {
    content: QuestionDetails
    difficulty: number
    difficulty_category: string
    discrimination: number
    discrimination_category: string
    r_pbis: number
    options: {
      [optionKey: string]: OptionDetails
    }
    group_choice_percentages: Record<string, number>[]
    correct_index: number
  }
}

export type OptionDetails = Readonly<{
  selected_by: number
  top_selected: number
  bottom_selected: number
  ratio: number
  discrimination: number
  r_pbis: number
}>

export type QuestionDetails = {
  question: string
  option: string[]
}

export type CTTGeneralDetails = Readonly<{
  general: {
    total_students: number
    total_questions: number
    total_options: number
  }
  histogram: {
    score: Record<string, number>[]
    difficulty: Record<string, number>[]
    discrimination: Record<string, number>[]
    r_pbis: Record<string, number>[]
  }
  average: AverageDetails
}>

export type AverageDetails = Readonly<{
  average_score: number
  average_discrimination: number
  average_difficulty: number
  average_rpbis?: number
  average_infit?: number
  average_outfit?: number
  average_reliability?: number
}>

export type RelevantKeys = Extract<
  keyof CTTAnalysisResult[keyof CTTAnalysisResult],
  'difficulty' | 'discrimination' | 'r_pbis'
>

// Map each key to its type in CTTAnalysisResult
type ValueType<Key extends RelevantKeys> =
  CTTAnalysisResult[keyof CTTAnalysisResult][Key]

export type ReviewQuestion = {
  questionNo: number
  id: string
  violatedIndices: {
    name: RelevantKeys | 'infit' | 'outfit' | 'reliability'
    value: ValueType<RelevantKeys>
    message: string
  }[]
}

export type AnswerType = keyof typeof Answers

export enum AnalyzeType {
  RASCH = 'Rasch',
  CTT = 'CTT',
  // IRT = 'IRT',
}
