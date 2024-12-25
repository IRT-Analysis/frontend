import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CTTGeneralDetails } from '@/types/ctt-analysis.type'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export const description = 'A bar chart'

const chartConfig = {
  numberOfStudent: {
    label: 'Số lượng thí sinh:',
    color: 'var(--primary-600-base)',
  },
} satisfies ChartConfig
export function LargeBarChart({
  data,
}: {
  data: CTTGeneralDetails['histogram']['score']
}) {
  const transformedArray = data.map((obj) => {
    const [correctItem, numberOfStudent] = Object.entries(obj)[0]
    return {
      correctItem: parseFloat(correctItem),
      numberOfStudent,
    }
  })
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
          <BarChart accessibilityLayer data={transformedArray}>
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
              width={30}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="numberOfStudent"
              fill={'#2993FF'}
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
