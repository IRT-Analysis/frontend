import http, { ApiResponse } from '@/lib/httpClient'
import { CTTAnalysisRequest } from '@/pages/dashboard/popup-dialog'

interface CTTAnalysisResponse {
  [key: string]: {
    difficulty: number
    difficulty_category: string
    discrimination: number
    discrimination_category: string
    r_pbis: number
    options: {
      [optionKey: string]: OptionDetails
    }
  }
}

interface OptionDetails {
  correct_answer: number
  selected_by: number
  top_selected: number
  bottom_selected: number
  ratio: number
  chosen_by: number
}

export const analyzeService = {
  cttAnalysis({
    projectName,
    numberOfChoices,
    numberOfGroup,
    groupPercentage,
    correlationRpbis,
    questionFile,
    answerFile,
    questionSetFile,
  }: CTTAnalysisRequest): Promise<ApiResponse<CTTAnalysisResponse>> {
    console.log(
      projectName,
      numberOfChoices,
      numberOfGroup,
      groupPercentage,
      correlationRpbis,
      questionFile,
      answerFile,
      questionSetFile
    )
    const formData = new FormData()
    formData.append('file', answerFile[0])

    return http.post<CTTAnalysisResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
