import { ReusableTable } from '@/components/table/reusable-table'
import { CollapsibleContent } from '@/components/ui/collapsible'
import {
  useGetAllQuestionsAnalysisQuery,
  useGetOptionsAnalysisQuery,
} from '@/queries/useAnalyze'
import { QuestionAnalysisType } from '@/schema/analysis.schema'
import { Row } from '@tanstack/react-table'
import { useParams } from 'react-router-dom'
import { columns } from './columns'
import { MetricsTable } from './metric-table'

const CollapsibleContentComp = (row: Row<QuestionAnalysisType>) => {
  const { id: questionId, content } = row.original
  const getOptionsAnalysisQuery = useGetOptionsAnalysisQuery(questionId)
  const optionsData = getOptionsAnalysisQuery.data?.data //return 4 option
  if (!optionsData) return <></>

  // const correct_answer = Object.keys(Answers)[correct_index]
  return (
    <CollapsibleContent asChild>
      <>
        <tr>
          <td colSpan={7} className="rounded-md border p-5">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold text-gray-800">
                {content}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {optionsData.map((option) => (
                  <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-center font-medium text-blue-600 shadow-sm">
                    {option.content}
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td colSpan={7} className="p-5">
            <div className="flex items-center gap-4">
              <div className="basis-[50%]">
                <MetricsTable data={optionsData} correct_option={'A'} />
              </div>
              <div className="basis-[50%]">
                {/* <CustomAreaChart
                  groupChoicePercentages={group_choice_percentages}
                  optionLabels={Object.keys(Answers)}
                  correct_option={Answers.A}
                /> */}
              </div>
            </div>
          </td>
        </tr>
      </>
    </CollapsibleContent>
  )
}

const ItemTable = () => {
  // const [currentDisplayQuestion, setCurrentDisplayQuestion] = useState<OptionAnalysisType[]>([])
  const { projectId } = useParams()
  const getAllQuestionAnalysisQuery = useGetAllQuestionsAnalysisQuery(
    projectId!
  )

  const data = getAllQuestionAnalysisQuery.data!.data

  return (
    <ReusableTable<QuestionAnalysisType>
      key={data.length}
      columns={columns}
      data={data}
      collapsibleContent={CollapsibleContentComp}
      isPending={getAllQuestionAnalysisQuery.isPending}
    />
  )
}
export default ItemTable
