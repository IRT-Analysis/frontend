import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function RaschItemFitChart({
  item,
}: {
  item: RaschQuestionAnalysisType
}) {
  const fitData = [
    {
      name: 'Infit',
      value: item.infit,
      fill:
        item.infit < 0.7 || item.infit > 1.3
          ? '#ef4444'
          : item.infit < 0.8 || item.infit > 1.2
            ? '#f59e0b'
            : '#22c55e',
    },
    {
      name: 'Outfit',
      value: item.outfit,
      fill:
        item.outfit < 0.7 || item.outfit > 1.3
          ? '#ef4444'
          : item.outfit < 0.8 || item.outfit > 1.2
            ? '#f59e0b'
            : '#22c55e',
    },
  ]

  // Reference lines for acceptable fit ranges
  const referenceLines = [
    { value: 0.7, label: 'Min', stroke: '#d1d5db' },
    { value: 1.0, label: 'Ideal', stroke: '#3b82f6' },
    { value: 1.3, label: 'Max', stroke: '#d1d5db' },
  ]

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={fitData}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <XAxis dataKey="name" />
          <YAxis
            domain={[0, 2]}
            ticks={[0, 0.5, 0.7, 1.0, 1.3, 1.5, 2.0]}
            label={{ value: 'Giá trị', angle: -90, position: 'left' }}
          />
          <Tooltip
            formatter={(value: number) => [value.toFixed(4), 'Giá trị']}
          />
          <Bar dataKey="value" fill="#8884d8" />

          {/* Add reference lines */}
          {referenceLines.map((line, index) => (
            <line
              key={index}
              x1="0%"
              y1={`${100 - (line.value / 2) * 100}%`}
              x2="100%"
              y2={`${100 - (line.value / 2) * 100}%`}
              stroke={line.stroke}
              strokeDasharray="3 3"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
