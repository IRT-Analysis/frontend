import http from '@/lib/httpClient'
import { CTTAnalysisRequest } from '@/pages/dashboard/create-analysis-form'
import {
  AnalyzeResType,
  GetAllQuestionAnalysisResType,
  GetGeneralDetailsQueryType,
  GetGeneralDetailsResType,
  GetHistogramQueryType,
  GetHistogramResType,
  GetOptionAnalysisResType,
  GetOptionsAnalysisResType,
  GetQuestionAnalysisResType,
  AnalyzeQueryType,
  GetAllQuestionAnalysisQueryType,
  GetOptionAnalysisQueryType,
  GetOptionsAnalysisQueryType,
  GetQuestionAnalysisQueryType,
  GetStudentResultQueryType,
  GetStudentResultResType,
  GetStudentsAnalysisQueryType,
  GetStudentsAnalysisResType,
  GetRaschAnalysisQueryType,
  GetRaschAnalysisResType,
} from '@/schema/analysis.schema'
import queryString from 'query-string'

const ROUTES = {
  ANALYZE: '/analyze',
  GENERAL_DETAILS: '/general-details',
  HISTOGRAM: '/histogram',
  RASCH_ANALYSIS: '/rasch-analysis',
  QUESTIONS_ANALYSIS: '/questions',
  QUESTION_ANALYSIS: '/question',
  OPTIONS_ANALYSIS: '/options',
  OPTION_ANALYSIS: '/option',
  STUDENTS_ANALYSIS: '/students',
  STUDENT_RESULT: '/student',
}

export const analyzeService = {
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
      `${ROUTES.ANALYZE}?${queryString.stringify({ type })}`,
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
      `${ROUTES.QUESTIONS_ANALYSIS}?${queryString.stringify(params)}`
    )
  },

  getGeneralDetails(
    params: GetGeneralDetailsQueryType
  ): Promise<GetGeneralDetailsResType> {
    return http.get<GetGeneralDetailsResType>(
      `${ROUTES.GENERAL_DETAILS}?${queryString.stringify(params)}`
    )
  },

  getHistogramDetails(
    params: GetHistogramQueryType
  ): Promise<GetHistogramResType> {
    return http.get<GetHistogramResType>(
      `${ROUTES.HISTOGRAM}?${queryString.stringify(params)}`
    )
  },

  getOptionsAnalysis(
    params: GetOptionsAnalysisQueryType
  ): Promise<GetOptionsAnalysisResType> {
    return http.get<GetOptionsAnalysisResType>(
      `${ROUTES.OPTIONS_ANALYSIS}?${queryString.stringify(params)}`
    )
  },

  getOptionAnalysis(
    params: GetOptionAnalysisQueryType
  ): Promise<GetOptionAnalysisResType> {
    return http.get<GetOptionAnalysisResType>(
      `${ROUTES.OPTION_ANALYSIS}/${queryString.stringify(params)}`
    )
  },

  getQuestionAnalysis(
    params: GetQuestionAnalysisQueryType
  ): Promise<GetQuestionAnalysisResType> {
    return http.get<GetQuestionAnalysisResType>(
      `${ROUTES.QUESTION_ANALYSIS}?${queryString.stringify(params)}`
    )
  },

  getStudentResult(
    params: GetStudentResultQueryType
  ): Promise<GetStudentResultResType> {
    return http.get<GetStudentResultResType>(
      `${ROUTES.STUDENT_RESULT}?${queryString.stringify(params)}`
    )
  },

  getStudentsAnalysis(
    params: GetStudentsAnalysisQueryType
  ): Promise<GetStudentsAnalysisResType> {
    return http.get<GetStudentsAnalysisResType>(
      `${ROUTES.STUDENTS_ANALYSIS}?${queryString.stringify(params)}`
    )
  },

  getRaschAnalysis(
    params: GetRaschAnalysisQueryType
  ): Promise<GetRaschAnalysisResType> {
    return http.get<GetRaschAnalysisResType>(
      `${ROUTES.RASCH_ANALYSIS}?${queryString.stringify(params)}`
    )
  },
}
