import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'
import { useRef, useState } from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  // Tooltip,
  // TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoverData, setHoverData] = useState<{
    x: number
    y: number
    ability: number
    probability: number
  } | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const usableWidth = rect.width - 50 // estimate padding
    const ability = (x / usableWidth) * (4 - -4) + -4

    const closest = iccData.reduce((prev, curr) =>
      Math.abs(curr.ability - ability) < Math.abs(prev.ability - ability)
        ? curr
        : prev
    )

    setHoverData({
      x,
      y,
      ability,
      probability: closest.probability,
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[300px] w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverData(null)}
    >
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
      {hoverData && (
        <>
          <div
            className="absolute bottom-[30px] top-[20px] w-[1px] bg-gray-400/70"
            style={{ left: hoverData.x }}
          />
          <div
            className="absolute z-10 rounded border bg-white px-3 py-2 text-sm text-gray-800 shadow-md"
            style={{ left: hoverData.x - 180, top: hoverData.y + 10 }}
          >
            <p>
              Năng lực: <strong>{hoverData.ability.toFixed(2)}</strong>
            </p>
            <p>
              Xác suất đúng: <strong>{hoverData.probability.toFixed(4)}</strong>
            </p>
          </div>
        </>
      )}
    </div>
  )
}
