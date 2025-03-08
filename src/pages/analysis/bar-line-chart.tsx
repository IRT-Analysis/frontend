import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, CartesianGrid, Cell, ComposedChart, XAxis, YAxis } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { ReactNode, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import HoverCardIcon from '@/components/reusable-hover-with-icon'

export const description = 'A bar chart'

const chartConfig = {
  numberOfQuestion: {
    label: 'Số lượng câu hỏi:',
  },
} satisfies ChartConfig

const groupColors = {
  'Very Bad': 'var(--very-bad-text)',
  Bad: 'var(--bad-text)',
  Average: 'var(--average-text)',
  Good: 'var(--good-text)',
  'Very Good': 'var(--very-good-text)',
}

const groupTranslations = {
  'Very Bad': 'Kém',
  Bad: 'Kém',
  Average: 'Trung bình',
  Good: 'Tốt',
  'Very Good': 'Rất tốt',
}

const CustomLegend = ({ data }: { data: Array<{ group: string }> }) => {
  const uniqueGroups = Array.from(new Set(data.map((item) => item.group)))
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {uniqueGroups.map((group) => (
        <div key={group} className="flex items-center">
          <div
            className="mr-2 h-2 w-2 rounded-[2px]"
            style={{
              backgroundColor: groupColors[group as keyof typeof groupColors],
            }}
          />
          <span
            className="text-sm"
            style={{ color: groupColors[group as keyof typeof groupColors] }}
          >
            {groupTranslations[group as keyof typeof groupTranslations] ||
              group}
          </span>
        </div>
      ))}
    </div>
  )
}

export function BarLineChart({
  name,
  data,
  isLoading,
  tootlTip,
  type,
}: {
  name: string
  data: Record<string, number>[] | undefined
  isLoading: boolean
  tootlTip: string | ReactNode
  type: 'difficulty' | 'discrimination' | 'r_pbis'
}) {
  const navigate = useNavigate()
  const transformedArray = useMemo(() => {
    if (!data || data.length === 0) {
      return []
    }
    return data.map((obj) => {
      const [index, numberOfQuestion] = Object.entries(obj)[0]
      const stat = parseFloat(index)

      let group = ''
      if (type === 'difficulty') {
        if (stat < 0.25) {
          group = 'Very Bad'
        } else if (stat < 0.5) {
          group = 'Good'
        } else if (stat < 0.75) {
          group = 'Good'
        } else {
          group = 'Very Bad'
        }
      } else if (type === 'discrimination') {
        if (stat < 0.1) {
          group = 'Very Bad'
        } else if (stat < 0.3) {
          group = 'Good'
        } else {
          group = 'Good'
        }
      } else if (type === 'r_pbis') {
        if (stat < 0.2) {
          group = 'Very Bad'
        } else if (stat <= 0.7) {
          group = 'Good'
        } else {
          group = 'Average'
        }
      }

      return {
        stat,
        numberOfQuestion,
        group,
      }
    })
  }, [data, type])

  if (isLoading) {
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />
  } else {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-1 text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
            {name}
            <HoverCardIcon size={12}>{tootlTip}</HoverCardIcon>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <ComposedChart accessibilityLayer data={transformedArray}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="stat"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                width={30}
                dataKey="numberOfQuestion"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="numberOfQuestion"
                radius={8}
                onClick={() => navigate('/analysis/line-chart')}
              >
                {transformedArray.map((item, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={groupColors[item.group as keyof typeof groupColors]}
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ChartContainer>
          <CustomLegend data={transformedArray} />
        </CardContent>
      </Card>
    )
  }
}
