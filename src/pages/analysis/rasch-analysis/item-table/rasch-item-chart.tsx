import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const { ability, probability } = payload[0].payload
    return (
      <div className="rounded border bg-white px-3 py-2 text-sm text-gray-800 shadow-md">
        <p>
          Năng lực: <strong>{ability.toFixed(2)}</strong>
        </p>
        <p>
          Xác suất trả lời đúng: <strong>{probability.toFixed(4)}</strong>
        </p>
      </div>
    )
  }
  return null
}

// ICC (Item Characteristic Curve) data generator
function generateICCData(logit: number) {
  const data = []
  for (let ability = -4; ability <= 4; ability += 0.05) {
    const exponent = 1 * (ability - logit)
    const probability = Math.exp(exponent) / (1 + Math.exp(exponent))
    data.push({ ability, probability })
  }

  return data
}

export function RaschItemChart({ item }: { item: RaschQuestionAnalysisType }) {
  const iccData = generateICCData(item.logit)

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={iccData}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <XAxis
            dataKey="ability"
            type="number"
            domain={[-4, 4]}
            ticks={[-4, -3, -2, -1, 0, 1, 2, 3, 4]}
            label={{ value: 'Năng lực (logit)', position: 'bottom' }}
          />
          <YAxis
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            label={{
              value: 'Xác suất trả lời đúng',
              angle: -90,
              position: 'left',
              dy: -60, // this centers it vertically; tweak if needed
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="probability"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
          {/* Horizontal line at 0.5 */}
          <Line
            data={[
              { ability: -4, threshold: 0.5 },
              { ability: 4, threshold: 0.5 },
            ]}
            type="linear"
            dataKey="threshold"
            stroke="#d1d5db"
            strokeDasharray="3 3"
            dot={false}
          />
          {/* Vertical line at logit */}
          <Line
            data={[
              { ability: item.logit, bound: 0 },
              { ability: item.logit, bound: 1 },
            ]}
            type="linear"
            dataKey="bound"
            stroke="#d1d5db"
            strokeDasharray="3 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
