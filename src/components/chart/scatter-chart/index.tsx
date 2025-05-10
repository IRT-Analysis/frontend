'use client'

import { useMemo, useState, type ReactNode } from 'react'
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'

import HoverCardIcon from '@/components/reusable-hover-with-icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { GetHistogramResType } from '@/schema/analysis.schema'

// Sample data - replace with your actual data

const groupColors = {
  Kém: 'var(--very-bad-text)',
  'Trung bình': '#F6A723',
  Tốt: 'var(--very-good-text)',
}

const groupTranslations = {
  Kém: 'Kém',
  'Trung bình': 'Trung bình',
  Tốt: 'Tốt',
}

const chartConfig = {
  questions: {
    label: 'Câu hỏi:',
  },
}

type ProcessedData = {
  question_id: number
  difficulty: number
  discrimination: number
  group: string
}[]

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

export default function ResponseAnalysisChart({
  name = 'Biểu đồ phân tán: độ khó và độ phân biệt',
  data,
  isLoading = false,
  tooltipContent = 'Biểu đồ trực quan hóa mỗi câu hỏi dựa trên độ khó và độ phân biệt, giúp đánh giá mức độ phù hợp với đề kiểm tra, khả năng phân loại học sinh, và phát hiện các câu hỏi quá dễ, quá khó hoặc kém hiệu quả trong việc đo lường năng lực.',
}: {
  name?: string
  data?: GetHistogramResType['data']['scatter']
  isLoading?: boolean
  tooltipContent?: string | ReactNode
}) {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [activePoint, setActivePoint] = useState<{
    x: number
    y: number
  } | null>(null)

  const processedData: ProcessedData = useMemo(() => {
    if (!data) return []
    return data.map((item) => {
      let group = 'Trung bình'

      if (
        item.discrimination < 0.3 ||
        item.difficulty < 0.3 ||
        item.difficulty > 0.8
      ) {
        group = 'Kém'
      } else if (
        item.discrimination >= 0.6 &&
        item.difficulty >= 0.3 &&
        item.difficulty <= 0.7
      ) {
        group = 'Tốt'
      }

      return {
        ...item,
        group,
      }
    })
  }, [data])

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex gap-1 text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
            {name}
            <HoverCardIcon size={12}>{tooltipContent}</HoverCardIcon>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <Skeleton className="mt-4 h-[20px] w-[100px] rounded-full" />
          <Skeleton className="mt-4 h-[20px] w-[200px] rounded-full" />
          <Skeleton className="mt-4 h-[20px] w-[100px] rounded-full" />
          <Skeleton className="mt-4 h-[20px] w-[200px] rounded-full" />
          <Skeleton className="mt-4 h-[20px] w-[100px] rounded-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex gap-1 text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
          {name}
          <HoverCardIcon size={12}>{tooltipContent}</HoverCardIcon>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 15,
                left: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="difficulty"
                name="Difficulty"
                domain={[0, 1]}
                tickCount={6}
                tickLine={true}
                tick={{ fill: '#8884d8' }}
                tickMargin={10}
                axisLine={true}
                label={{
                  value: 'Độ khó (Difficulty)',
                  position: 'bottom',
                  offset: 0,
                }}
              />
              <YAxis
                type="number"
                dataKey="discrimination"
                name="Discrimination"
                domain={[0, 1]}
                tickCount={6}
                tickMargin={10}
                tick={{ fill: '#8884d8' }}
                label={{
                  value: 'Độ phân cách (Discrimination)',
                  angle: -90,
                  position: 'left',
                  offset: 0,
                  dy: -80,
                }}
              />
              <ZAxis type="number" range={[60, 60]} />
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ProcessedData[number]
                    return (
                      <div className="rounded border bg-white px-3 py-2 text-xs shadow">
                        <div className="text-muted-foreground">
                          Câu hỏi:{' '}
                          <span className="font-semibold text-foreground">
                            {data.question_id}
                          </span>
                        </div>
                        <div className="flex min-w-[130px] items-center text-muted-foreground">
                          Độ khó:
                          <div className="ml-auto font-mono font-medium tabular-nums text-foreground">
                            {data.difficulty.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex min-w-[130px] items-center text-muted-foreground">
                          Độ phân cách:
                          <div className="ml-auto font-mono font-medium tabular-nums text-foreground">
                            {data.discrimination.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex min-w-[130px] items-center text-muted-foreground">
                          Nhóm:
                          <div className="ml-auto font-mono font-medium tabular-nums text-foreground">
                            {groupTranslations[
                              data.group as keyof typeof groupTranslations
                            ] || data.group}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              {activePoint && (
                <>
                  <ReferenceLine
                    x={activePoint.x}
                    stroke="#8884d8"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                  />
                  <ReferenceLine
                    y={activePoint.y}
                    stroke="#8884d8"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                  />
                </>
              )}
              <Scatter
                name="Questions"
                data={processedData}
                onClick={(data: ProcessedData[number]) => {
                  // Navigate to question detail or handle click
                  console.log(`Clicked on question ${data.question_id}`)
                }}
                shape={(props: unknown) => {
                  const { cx, cy, payload } = props as {
                    cx: number
                    cy: number
                    payload: ProcessedData[number]
                  }
                  const isActive = activeQuestion === payload.question_id
                  const group = payload.group as keyof typeof groupColors
                  const color = groupColors[group] || 'var(--average-text)'

                  return (
                    <g>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? 8 : 6}
                        fill={color}
                        onMouseEnter={() => {
                          setActiveQuestion(payload.question_id)
                          setActivePoint({
                            x: payload.difficulty,
                            y: payload.discrimination,
                          })
                        }}
                        onMouseLeave={() => {
                          setActiveQuestion(null)
                          setActivePoint(null)
                        }}
                      />
                      {/* <text
                        x={cx + 10}
                        y={cy}
                        dy={-10}
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize={12}
                        opacity={isActive ? 1 : 0.7}
                      >
                        {payload.question_id}
                      </text> */}
                    </g>
                  )
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
        <CustomLegend data={processedData} />
      </CardContent>
    </Card>
  )
}
