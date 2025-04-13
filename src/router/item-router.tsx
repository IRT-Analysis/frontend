// ItemsRouter.tsx
import Items from '@/pages/analysis/items'
import RaschItems from '@/pages/analysis/rasch-analysis'
import { AnalyzeType } from '@/types/ctt-analysis.type'
import { useParams } from 'react-router-dom'

const ItemsRouter = () => {
  const { analysisType } = useParams()

  if (analysisType === AnalyzeType.RASCH) return <RaschItems />
  return <Items />
}

export default ItemsRouter
