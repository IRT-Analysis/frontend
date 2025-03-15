import {
  AnalyzeQueryType,
  GetAllQuestionAnalysisQueryType,
  GetOptionAnalysisQueryType,
  GetOptionsAnalysisQueryType,
  GetQuestionAnalysisQueryType,
} from './../schema/analysis.schema'
import http from '@/lib/httpClient'
import queryString from 'query-string'
import {
  AnalyzeResType,
  GetGeneralDetailsResType,
  GetHistogramResType,
  GetAllQuestionAnalysisResType,
  GetOptionsAnalysisResType,
  GetOptionAnalysisResType,
  GetQuestionAnalysisResType,
  GetGeneralDetailsQueryType,
  GetHistogramQueryType,
} from '@/schema/analysis.schema'
import { CTTAnalysisRequest } from '@/pages/dashboard/create-analysis-form'

export const cttAnalyzeService = {
  analyze({
    projectName,
    numberOfGroup,
    groupPercentage,
    correlationRpbis,
    questionFile,
    answerFile,
    type,
  }: CTTAnalysisRequest & AnalyzeQueryType): Promise<AnalyzeResType> {
    const formData = new FormData()
    formData.append('exam_file', questionFile[0])
    formData.append('result_file', answerFile[0])
    if (projectName) formData.append('projectName', projectName)
    if (numberOfGroup)
      formData.append('numberOfGroup', numberOfGroup.toString())
    if (groupPercentage)
      formData.append('groupPercentage', groupPercentage.toString())
    if (correlationRpbis)
      formData.append('correlationRpbis', correlationRpbis.toString())

    return http.post<AnalyzeResType>(
      `/analyze?${queryString.stringify({ type })}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
  },

  getAllQuestionAnalysis(
    params: GetAllQuestionAnalysisQueryType
  ): Promise<GetAllQuestionAnalysisResType> {
    return http.get<GetAllQuestionAnalysisResType>(
      `/questions-analysis/?${queryString.stringify(params)}`
    )
  },

  getGeneralDetails(
    params: GetGeneralDetailsQueryType
  ): Promise<GetGeneralDetailsResType> {
    return http.get<GetGeneralDetailsResType>(
      `/general-details/?${queryString.stringify(params)}`
    )
  },

  getHistogramDetails(
    params: GetHistogramQueryType
  ): Promise<GetHistogramResType> {
    return http.get<GetHistogramResType>(
      `/histogram/?${queryString.stringify(params)}`
    )
  },

  getOptionsAnalysis(
    params: GetOptionsAnalysisQueryType
  ): Promise<GetOptionsAnalysisResType> {
    return http.get<GetOptionsAnalysisResType>(
      `/options-analysis/?${queryString.stringify(params)}`
    )
  },

  getOptionAnalysis(
    params: GetOptionAnalysisQueryType
  ): Promise<GetOptionAnalysisResType> {
    return http.get<GetOptionAnalysisResType>(
      `/option-analysis/?${queryString.stringify(params)}`
    )
  },

  getQuestionAnalysis(
    params: GetQuestionAnalysisQueryType
  ): Promise<GetQuestionAnalysisResType> {
    return http.get<GetQuestionAnalysisResType>(
      `/question-analysis/?${queryString.stringify(params)}`
    )
  },
}
