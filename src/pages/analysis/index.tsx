import { AnalyzeType } from '@/types/ctt-analysis.type'
import { useParams } from 'react-router-dom'
import CTTAnalysis from './ctt-analysis'
import RaschAnalysis from './rasch-analysis'

const Analysis = () => {
  const { analysisType } = useParams()
  if (analysisType === AnalyzeType.CTT) return <CTTAnalysis />
  else {
    return <RaschAnalysis />
  }
}

export default Analysis
