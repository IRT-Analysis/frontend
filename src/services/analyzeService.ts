import http, { ApiResponse } from '@/lib/httpClient'
import { CTTAnalysisRequest } from '@/pages/dashboard/popup-dialog'

export type CTTAnalysis = {
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

export type CTTGeneralDetails = Readonly<{
  total_students: number
  total_questions: number
  total_option: number
}>

export type OptionDetails = Readonly<{
  selected_by: number
  top_selected: number
  bottom_selected: number
  ratio: number
  discrimination: number
  r_pbis: number
}>

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
  }: CTTAnalysisRequest): Promise<ApiResponse<CTTAnalysis>> {
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

    return http.post<CTTAnalysis>('/ctt/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getCTTAnalysisResult(id: string): Promise<ApiResponse<CTTAnalysis>> {
    return http.get<CTTAnalysis>(`/ctt/items/${id}`)
  },

  getCTTAnalysisGeneralDetail(
    id: string
  ): Promise<ApiResponse<CTTGeneralDetails>> {
    return http.get<CTTGeneralDetails>(`/ctt/general-detail/${id}`)
  },
}
