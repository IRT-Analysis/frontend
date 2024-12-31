import {
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Label,
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardContent } from '@/components/ui/card'
import { useMemo } from 'react'

// Chart configuration
const chartConfig = {
  group: {
    label: 'Nhóm',
    color: 'hsl(var(--chart-1))',
  },
  A: {
    label: 'A',
    color: 'hsl(var(--chart-A))',
  },
  B: {
    label: 'B',
    color: 'hsl(var(--chart-B))',
  },
  C: {
    label: 'C',
    color: 'hsl(var(--chart-C))',
  },
  D: {
    label: 'D',
    color: 'hsl(var(--chart-D))',
  },
} satisfies ChartConfig

export function CustomAreaChart({
  groupChoicePercentages,
  optionLabels,
  correct_option,
}: {
  groupChoicePercentages: Record<string, number>[]
  optionLabels: string[] // Labels corresponding to options, e.g., ["A", "B", "C", "D"]
  correct_option: string
}) {
  // Use useMemo to transform the data
  const chartData = useMemo(() => {
    return groupChoicePercentages.map((groupData, index) => {
      const transformedGroup: { [key: string]: number | string } = {
        group: `${index + 1}`,
        A: 0,
        B: 0,
        C: 0,
        D: 0,
      }

      // Map option percentages into the group
      optionLabels.forEach((label, idx) => {
        transformedGroup[label] = groupData[idx] || 0 // Use option index (0, 1, 2...) to map
      })

      return transformedGroup
    })
  }, [groupChoicePercentages, optionLabels])

  return (
    <Card className="">
      <CardContent className="p-4 pb-0">
        <ChartContainer config={chartConfig} className="">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 10,
              bottom: 25,
              top: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="group" tickLine={false} tickMargin={8} height={25}>
              <Label position="bottom" value={'Nhóm'} offset={5} />
            </XAxis>
            <YAxis width={30} tickLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            {['A', 'B', 'C', 'D'].map((option) => (
              // Map each option to a line
              <Line
                key={option}
                dataKey={option}
                type="natural"
                stroke={chartConfig[option as 'A' | 'B' | 'C' | 'D'].color}
                strokeDasharray={option == correct_option ? '' : '5 5'} // Dotted line for differentiation
                strokeWidth={option == correct_option ? 2 : 1.5}
                dot={{ r: 3 }}
                activeDot={{ r: 4 }}
              />
            ))}
            <Legend
              formatter={(value) =>
                value === correct_option ? `${value} (Đáp án)` : value
              }
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: 10 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
