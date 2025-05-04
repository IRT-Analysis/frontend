import HoverCardIcon from '@/components/reusable-hover-with-icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { type ReactNode, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'

interface DataItem {
  questionNo: number
  infit: number
  outfit: number
}

interface InfitDeviationChartProps {
  data: DataItem[]
  isLoading?: boolean
  title?: string
  tooltip?: ReactNode
  className?: string
}

// Define your custom colors
const customColors = {
  normal: '#2993FF', // Blue for normal range
  outOfRange: 'var(--very-bad-text)', // Red for out of range
}

// Thresholds
const UPPER_THRESHOLD = 1.33
const LOWER_THRESHOLD = 0.77
const REFERENCE_VALUE = 1.0

// Chart configuration
const chartConfig = {
  infit: {
    label: 'Infit:',
  },
} satisfies ChartConfig

// Custom legend component

const CustomLegend = () => (
  <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
    <div className="flex items-center">
      <div
        className="mr-2 h-2 w-2 rounded-[2px]"
        style={{ backgroundColor: customColors.normal }}
      />
      <span>Trong khoảng cho phép (0.77 - 1.33)</span>
    </div>
    <div className="flex items-center">
      <div
        className="mr-2 h-2 w-2 rounded-[2px]"
        style={{ backgroundColor: customColors.outOfRange }}
      />
      <span>Ngoài khoảng (&lt; 0.77 hoặc &gt; 1.33)</span>
    </div>
  </div>
)

export default function InfitDeviationChartFixed({
  data,
  isLoading = false,
  className,
}: InfitDeviationChartProps) {
  // State for hover tooltip
  const [tooltipData, setTooltipData] = useState<{
    item: string
    infit: number
    deviation: number
    isOutOfRange: boolean
    x: number
    y: number
    visible: boolean
  } | null>(null)

  // Transform data for the deviation chart
  const transformedData = useMemo(() => {
    return data.map((item) => {
      // Calculate deviation from reference value (1.0)
      const deviation = item.infit - REFERENCE_VALUE

      // Determine if the value is out of range
      const isOutOfRange =
        item.infit > UPPER_THRESHOLD || item.infit < LOWER_THRESHOLD

      return {
        ...item,
        deviation,
        isOutOfRange,
      }
    })
  }, [data])

  // Calculate domain for Y axis to ensure symmetrical display
  const yDomain = useMemo(() => {
    const deviations = transformedData.map((d) => d.deviation)
    const max = Math.max(...deviations)
    const min = Math.min(...deviations)

    const roundedMax = (Math.ceil(max * 2) - 0.5) / 2
    const roundedMin = (Math.floor(min * 2) + 0.5) / 2

    return [roundedMin, roundedMax]
  }, [transformedData])

  // Determine status based on infit value
  const getStatus = (infit: number) => {
    if (infit > UPPER_THRESHOLD) return 'Quá cao'
    if (infit < LOWER_THRESHOLD) return 'Quá thấp'
    return 'Tốt'
  }

  // Determine color class based on status
  const getStatusColorClass = (infit: number) => {
    if (infit > UPPER_THRESHOLD || infit < LOWER_THRESHOLD)
      return 'text-red-500 font-medium'
    return 'text-green-600 font-medium'
  }

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full rounded-lg" />
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex gap-1 text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
          Biểu đồ độ lệch Infit so với 1.0
          <HoverCardIcon size={12}>
            Biểu đồ thể hiện độ lệch của giá trị Infit so với giá trị lý tưởng
            (1.0). Các giá trị vượt ngoài khoảng [0.77, 1.33] được xem là bất
            thường.
          </HoverCardIcon>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 0, left: 10, bottom: 0 }}
            barGap={0}
            barCategoryGap="20%"
            onMouseMove={(e) => {
              if (e.activePayload && e.activePayload.length) {
                const payload = e.activePayload[0].payload
                setTooltipData({
                  item: payload.item,
                  infit: payload.infit,
                  deviation: payload.deviation,
                  isOutOfRange: payload.isOutOfRange,
                  x: e.chartX!,
                  y: e.chartY!,
                  visible: true,
                })
              }
            }}
            onMouseLeave={() => {
              setTooltipData(null)
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="questionNo"
              type="category"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              type="number"
              domain={yDomain}
              tickFormatter={(value) => (value + REFERENCE_VALUE).toFixed(2)}
              axisLine={false}
              tickLine={false}
              width={30}
              tickMargin={10}
            />
            <ReferenceLine
              y={0}
              stroke="#999"
              strokeWidth={2}
              // label={{
              //   value: '1.00',
              //   position: 'left',
              //   fontSize: 12,
              //   dx: -10,
              // }}
            />

            {/* Reference lines for thresholds */}
            <ReferenceLine
              y={LOWER_THRESHOLD - REFERENCE_VALUE}
              stroke="rgba(239, 68, 68, 0.5)"
              strokeDasharray="3 3"
              label={{
                value: '0.77',
                position: 'left',
                fill: 'rgba(239, 68, 68, 0.8)',
                fontSize: 12,
                dx: -10, // left-right
                dy: -4, // up-down
              }}
            />

            <ReferenceLine
              y={UPPER_THRESHOLD - REFERENCE_VALUE}
              stroke="rgba(239, 68, 68, 0.5)"
              strokeDasharray="3 3"
              label={{
                value: '1.33',
                position: 'left',
                fill: 'rgba(239, 68, 68, 0.8)',
                fontSize: 12,
                dx: -10,
                dy: -4,
              }}
            />

            {/* Deviation bars */}
            <Bar dataKey="deviation" name="Độ lệch Infit" radius={4}>
              {transformedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isOutOfRange
                      ? customColors.outOfRange
                      : customColors.normal
                  }
                  className="cursor-pointer transition-opacity hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <CustomLegend />

        {/* Custom tooltip */}
        {tooltipData && tooltipData.visible && (
          <div
            className="pointer-events-none absolute z-10"
            style={{ left: tooltipData.x + 10, top: tooltipData.y - 70 }}
          >
            <div className="w-64 rounded-md border bg-white p-3 shadow-lg">
              <div className="mb-1 font-medium">Mục {tooltipData.item}</div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span className="text-muted-foreground">Giá trị Infit:</span>
                <span className="font-medium">
                  {tooltipData.infit.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span className="text-muted-foreground">Độ lệch:</span>
                <span className="font-medium">
                  {tooltipData.deviation.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span className="text-muted-foreground">Trạng thái:</span>
                <span className={getStatusColorClass(tooltipData.infit)}>
                  {getStatus(tooltipData.infit)}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {tooltipData.infit > UPPER_THRESHOLD ? (
                  <p>
                    Giá trị Infit quá cao, cho thấy độ phù hợp thấp (dữ liệu
                    không nhất quán).
                  </p>
                ) : tooltipData.infit < LOWER_THRESHOLD ? (
                  <p>
                    Giá trị Infit quá thấp, cho thấy độ phù hợp cao quá mức (dễ
                    dự đoán).
                  </p>
                ) : (
                  <p>Giá trị Infit nằm trong khoảng cho phép.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
