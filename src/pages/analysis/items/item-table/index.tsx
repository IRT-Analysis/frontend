import { CustomAreaChart } from '@/components/chart/area-chart'
import { ReusableTable } from '@/components/table/reusable-table'
import { CollapsibleContent } from '@/components/ui/collapsible'
import { useParams } from 'react-router-dom'
import { columns } from './columns'
import { MetricsTable } from './metric-table'
import { useMemo } from 'react'
import { useGetAllQuestionsAnalysisQuery } from '@/queries/useAnalyze'

const ItemTable = () => {
  const { id } = useParams() as { id: string }
  const getItemsResult = useGetAllQuestionsAnalysisQuery(id)

  const responseArray = useMemo(() => {
    const data = getItemsResult.data?.data || {}
    return Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value,
    }))
  }, [getItemsResult.data])

  const collapsibleContent = (row: number) => {
    const { content, options, correct_index, group_choice_percentages } =
      responseArray[row]
    const correct_answer = ['A', 'B', 'C', 'D'][correct_index]
    return (
      <CollapsibleContent asChild>
        <>
          <tr>
            <td colSpan={7} className="rounded-md border p-5">
              <div className="flex flex-col gap-4">
                <div className="text-lg font-semibold text-gray-800">
                  {content.question}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {content.option.map((option) => (
                    <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-center font-medium text-blue-600 shadow-sm">
                      {option}
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
                  <MetricsTable
                    data={options}
                    correct_option={correct_answer}
                  />
                </div>
                <div className="basis-[50%]">
                  <CustomAreaChart
                    groupChoicePercentages={group_choice_percentages}
                    optionLabels={['A', 'B', 'C', 'D']}
                    correct_option={correct_answer}
                  />
                </div>
              </div>
            </td>
          </tr>
        </>
      </CollapsibleContent>
    )
  }

  return (
    <ReusableTable<(typeof responseArray)[number]>
      key={responseArray.length}
      columns={columns}
      data={responseArray}
      collapsibleContent={collapsibleContent}
      isPending={getItemsResult.isPending}
    />
  )
}
export default ItemTable
