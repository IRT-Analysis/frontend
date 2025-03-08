import http, { ApiResponse } from '@/lib/httpClient'
import { CTTAnalysisRequest } from '@/pages/dashboard/create-analysis-form'
import { CTTAnalysisResult, CTTGeneralDetails } from '@/types/ctt-analysis.type'
import queryString from 'query-string'
export const cttAnalyzeService = {
  analyze({
    projectName,
    numberOfGroup,
    groupPercentage,
    correlationRpbis,
    questionFile,
    answerFile,
  }: CTTAnalysisRequest): Promise<ApiResponse<CTTAnalysisResult>> {
    console.log(
      projectName,
      numberOfGroup,
      groupPercentage,
      correlationRpbis,
      questionFile,
      answerFile
    )
    const formData = new FormData()
    formData.append('exam_file', questionFile[0])
    formData.append('result_file', answerFile[0])

    return http.post<CTTAnalysisResult>('/ctt/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getAllQuestionAnalysis(
    projectId: string
  ): Promise<ApiResponse<CTTAnalysisResult>> {
    return http.get<CTTAnalysisResult>(
      `question-analysis/?${queryString.stringify({ projectId })}`
    )
  },

  getGeneralDetails(
    projectId: string
  ): Promise<ApiResponse<CTTGeneralDetails>> {
    return http.get<CTTGeneralDetails>(
      `/general-details/?${queryString.stringify({ projectId })}`
    )
  },

  getHistogramDetails(projectId: string): Promise<unknown> {
    return http.get(`/histogram/?${queryString.stringify({ projectId })}`)
  },

  getOptionAnlysis(questionId: string): Promise<unknown> {
    return http.get(
      `/option-analysis/?${queryString.stringify({ projectId: questionId })}`
    )
  },
}
