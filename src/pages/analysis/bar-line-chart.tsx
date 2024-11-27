import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, CartesianGrid, Cell, ComposedChart, XAxis, YAxis } from 'recharts'
import { MOCK_LINE_BARCHART_DATA } from './MOCK_DATA.ts'
import { useNavigate } from 'react-router-dom'

export const description = 'A bar chart'

const chartConfig = {
  numberOfStudent: {
    label: 'numberOfStudent',
    // color: 'var(--primary-600-base)',
  },
} satisfies ChartConfig

export function BarLineChart() {
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
          Biểu đồ phân bố điểm
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <ComposedChart accessibilityLayer data={MOCK_LINE_BARCHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="correctItem"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              width={30}
              dataKey="numberOfStudent"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="numberOfStudent"
              radius={8}
              // activeBar={{ fill: 'var(--primary-600-base)' }}
              onClick={() => navigate('/analysis/line-chart')}
            >
              {MOCK_LINE_BARCHART_DATA.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index < 14
                      ? 'var(--very-good-text)'
                      : index < 16
                        ? 'var(--average-text)'
                        : 'var(--bad-text'
                  }
                />
              ))}
            </Bar>

            {/* <Line
              type="monotone"
              dataKey="numberOfStudent"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 1.5 }}
              activeDot={{ r: 2 }}
            /> */}
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
