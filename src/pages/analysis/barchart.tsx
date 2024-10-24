import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { MOCK_BARCHART_DATA } from './MOCK_DATA.ts'

export const description = 'A bar chart'

const chartConfig = {
  numberOfStudent: {
    label: 'numberOfStudent',
    color: 'var(--primary-600-base)',
  },
} satisfies ChartConfig
export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
          Biểu đồ phân bố điểm
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={MOCK_BARCHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="correctItem"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
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
              fill="#2563EB52"
              radius={8}
              activeBar={{ fill: 'var(--primary-600-base)' }}
            />
          </BarChart>
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
