import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// ICC (Item Characteristic Curve) data generator
function generateICCData(difficulty: number, discrimination: number) {
  const data = []
  // Generate ability levels from -4 to 4 logits
  for (let ability = -4; ability <= 4; ability += 0.25) {
    // Calculate probability using the Rasch model formula
    // P(θ) = e^(θ-b) / (1 + e^(θ-b))
    // where θ is ability and b is difficulty
    const exponent = discrimination * (ability - difficulty)
    const probability = Math.exp(exponent) / (1 + Math.exp(exponent))

    data.push({
      ability,
      probability: probability,
    })
  }
  return data
}

export function RaschItemChart({ item }: { item: RaschQuestionAnalysisType }) {
  const iccData = generateICCData(item.difficulty, item.discrimination || 1)

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={iccData}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <XAxis
            dataKey="ability"
            label={{ value: 'Năng lực (logit)', position: 'bottom', offset: 0 }}
            domain={[-4, 4]}
            ticks={[-4, -3, -2, -1, 0, 1, 2, 3, 4]}
          />
          <YAxis
            label={{
              value: 'Xác suất trả lời đúng',
              angle: -90,
              position: 'left',
            }}
            domain={[0, 1]}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
          />
          <Tooltip
            formatter={(value: number) => [value.toFixed(4), 'Xác suất']}
            labelFormatter={(value) => `Năng lực: ${value} logit`}
          />
          <Line
            type="monotone"
            dataKey="probability"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
          {/* Add a horizontal line at P=0.5 */}
          <Line
            data={[
              { ability: -4, threshold: 0.5 },
              { ability: 4, threshold: 0.5 },
            ]}
            type="monotone"
            dataKey="threshold"
            stroke="#d1d5db"
            strokeDasharray="3 3"
            dot={false}
          />
          {/* Add a vertical line at the item difficulty */}
          <Line
            data={[
              { ability: item.difficulty, min: 0 },
              { ability: item.difficulty, max: 1 },
            ]}
            type="monotone"
            dataKey="min"
            stroke="#d1d5db"
            strokeDasharray="3 3"
            dot={false}
          />
          <Line
            data={[
              { ability: item.difficulty, min: 0 },
              { ability: item.difficulty, max: 1 },
            ]}
            type="monotone"
            dataKey="max"
            stroke="#d1d5db"
            strokeDasharray="3 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
