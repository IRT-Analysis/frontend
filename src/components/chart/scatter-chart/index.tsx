import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'

const mockData = [
  { month: 'Jan', desktop: 43, mobile: 60 },
  { month: 'Feb', desktop: 137, mobile: 48 },
  { month: 'Mar', desktop: 61, mobile: 177 },
  { month: 'Apr', desktop: 145, mobile: 78 },
  { month: 'May', desktop: 26, mobile: 96 },
  { month: 'Jun', desktop: 154, mobile: 204 },
]

export default function Component() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Scatter Plot</CardTitle>
        <CardDescription>
          A scatter plot showing total page views for the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            desktop: {
              label: 'Desktop',
              color: 'hsl(var(--chart-1))',
            },
            mobile: {
              label: 'Mobile',
              color: 'hsl(var(--chart-2))',
            },
          }}
          className="aspect-[9/4]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                type="category"
                name="Month"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="number"
                name="Views"
                tickLine={false}
                axisLine={false}
                domain={[0, 'dataMax + 20']}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                name="Desktop"
                data={mockData}
                dataKey="desktop"
                fill="var(--color-desktop)"
              >
                {mockData.map((entry, index) => (
                  <circle
                    key={`desktop-${index}`}
                    cx={0}
                    cy={0}
                    r={6}
                    fill="var(--color-desktop)"
                  />
                ))}
              </Scatter>
              <Scatter
                name="Mobile"
                data={mockData}
                dataKey="mobile"
                fill="var(--color-mobile)"
              >
                {mockData.map((_, index) => (
                  <circle
                    key={`mobile-${index}`}
                    cx={0}
                    cy={0}
                    r={6}
                    fill="var(--color-mobile)"
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
