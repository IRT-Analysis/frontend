import type React from 'react'

import { cn } from '@/lib/utils'
import { AxisLeft } from '@visx/axis'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import { Line } from '@visx/shape'
import { Text } from '@visx/text'
import { Tooltip, useTooltip, useTooltipInPortal } from '@visx/tooltip'
import { localPoint } from '@vx/event'
import { useMemo } from 'react'
import { InfoIcon } from 'lucide-react'
import { Badge } from './badge'

type KidmapItem = {
  id: number
  difficulty: number
  correct: boolean
}

export type KidmapData = {
  studentId: string
  ability: number
  items: KidmapItem[]
}

type QuadrantItems = {
  I: KidmapItem[]
  II: KidmapItem[]
  III: KidmapItem[]
  IV: KidmapItem[]
}

interface KidmapVisualizationProps {
  data: KidmapData
  width?: number
  height?: number
}

export function KidmapVisualization({
  data,
  width = 800,
  height = 600,
}: KidmapVisualizationProps) {
  // Process data into quadrants
  const quadrantItems = useMemo(() => {
    const result: QuadrantItems = {
      I: [], // Incorrect, b > θ (expected)
      II: [], // Correct, b > θ (unexpected)
      III: [], // Correct, b < θ (expected)
      IV: [], // Incorrect, b < θ (unexpected)
    }

    data.items.forEach((item) => {
      const isHard = item.difficulty > data.ability
      const correct = item.correct

      if (!correct && isHard) result.I.push(item)
      else if (correct && isHard) result.II.push(item)
      else if (correct && !isHard) result.III.push(item)
      else if (!correct && !isHard) result.IV.push(item)
    })

    return result
  }, [data])

  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip<KidmapItem & { quadrant: 1 | 2 | 3 | 4; expected: boolean }>()

  const { containerRef } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  })

  // Find min and max difficulty for y-axis scale
  const minDifficulty = Math.min(...data.items.map((item) => item.difficulty))
  const maxDifficulty = Math.max(...data.items.map((item) => item.difficulty))

  // Add some padding to the min/max
  const yDomain = [
    Math.min(minDifficulty, data.ability) - 0.5,
    Math.max(maxDifficulty, data.ability) + 0.5,
  ]

  // Set up scales
  const yScale = scaleLinear<number>({
    domain: yDomain,
    range: [height - 40, 40], // leave space for labels
  })

  // Calculate positions for items in each quadrant
  const margin = { top: 20, right: 20, bottom: 20, left: 60 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // Horizontal midpoint
  const midX = innerWidth / 2

  // Position for ability line
  const abilityY = yScale(data.ability)

  // Layout items in each quadrant
  const layoutItems = (
    items: KidmapItem[],
    quadrant: 'I' | 'II' | 'III' | 'IV'
  ): {
    x: number
    y: number
    quadrant: 1 | 2 | 3 | 4
    expected: boolean
    id: number
    difficulty: number
    correct: boolean
  }[] => {
    const isLeft = quadrant === 'I' || quadrant === 'IV'
    const baseX = isLeft ? midX / 2 : midX + midX / 2

    // Sort items by difficulty
    const sortedItems = [...items].sort((a, b) => a.difficulty - b.difficulty)

    // Calculate positions
    return sortedItems.map((item, i) => {
      const y = yScale(item.difficulty)

      // Adjust x position to avoid overlaps
      const xOffset = ((i % 5) - 2) * 20 // Spread items horizontally

      return {
        ...item,
        x: baseX + xOffset,
        y,
        quadrant:
          quadrant === 'I'
            ? 1
            : quadrant === 'II'
              ? 2
              : quadrant === 'III'
                ? 3
                : 4,
        expected: quadrant === 'I' || quadrant === 'III',
      }
    })
  }

  const quadrantI = layoutItems(quadrantItems.I, 'I')
  const quadrantII = layoutItems(quadrantItems.II, 'II')
  const quadrantIII = layoutItems(quadrantItems.III, 'III')
  const quadrantIV = layoutItems(quadrantItems.IV, 'IV')

  const handleMouseOver = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    datum: KidmapItem & { quadrant: 1 | 2 | 3 | 4; expected: boolean }
  ) => {
    const coords = localPoint(
      (event.target as SVGSVGElement).ownerSVGElement ?? event.currentTarget,
      event
    )

    if (coords) {
      showTooltip({
        tooltipLeft: coords.x,
        tooltipTop: coords.y,
        tooltipData: datum,
      })
    }
  }

  // Get quadrant explanation
  const getQuadrantInfo = (
    quadrant: number,
    _difficulty: number,
    _correct: boolean,
    expected: boolean
  ) => {
    const explanations = {
      1: {
        title: 'Phần I - Câu hỏi khó & trả lời sai',
        description:
          'Câu hỏi này có độ khó cao hơn năng lực của bạn và bạn đã trả lời sai. Đây là kết quả phổ biến với câu hỏi khó.',
        suggestion: 'Nên tập trung ôn tập kỹ phần kiến thức này.',
      },
      2: {
        title: 'Phần II - Câu hỏi khó & trả lời đúng',
        description:
          'Câu hỏi này có độ khó cao hơn năng lực của bạn nhưng bạn đã trả lời đúng. Điều này cho thấy bạn có thể đã nắm vững kiến thức nâng cao này.',
        suggestion: 'Tiếp tục duy trì kiến thức tốt này.',
      },
      3: {
        title: 'Phần III - Câu hỏi dễ & trả lời đúng',
        description:
          'Câu hỏi này có độ khó thấp hơn năng lực của bạn và bạn đã trả lời đúng. Đây là kết quả mong đợi với câu hỏi cơ bản.',
        suggestion: 'Bạn đã nắm vững kiến thức cơ bản này.',
      },
      4: {
        title: 'Phần IV - Câu hỏi dễ & trả lời sai',
        description:
          'Câu hỏi này có độ khó thấp hơn năng lực của bạn nhưng bạn đã trả lời sai. Đây là điểm cần lưu ý vì đây là kiến thức cơ bản.',
        suggestion: 'Cần ôn lại kiến thức cơ bản này ngay lập tức.',
      },
    }

    const expectationText = expected
      ? 'Kết quả này nằm trong dự đoán (mong đợi).'
      : 'Kết quả này nằm ngoài dự đoán (bất ngờ).'

    return {
      ...explanations[quadrant as keyof typeof explanations],
      expectation: expectationText,
    }
  }

  // Get color for quadrant
  const getQuadrantColor = (quadrant: number) => {
    const colors = {
      1: 'border-blue-400 bg-blue-50',
      2: 'border-yellow-400 bg-yellow-50',
      3: 'border-green-400 bg-green-50',
      4: 'border-red-400 bg-red-50',
    }
    return colors[quadrant as keyof typeof colors]
  }

  return (
    <>
      <svg
        ref={containerRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Group left={margin.left} top={margin.top}>
          {/* Background for quadrants */}
          <rect
            x={0}
            y={0}
            width={midX}
            height={abilityY}
            fill="#e6f7ff"
            opacity={0.5}
          />
          <rect
            x={midX}
            y={0}
            width={midX}
            height={abilityY}
            fill="#fff9e6"
            opacity={0.5}
          />
          <rect
            x={midX}
            y={abilityY}
            width={midX}
            height={innerHeight - abilityY}
            fill="#e6f7ff"
            opacity={0.5}
          />
          <rect
            x={0}
            y={abilityY}
            width={midX}
            height={innerHeight - abilityY}
            fill="#fff9e6"
            opacity={0.5}
          />

          {/* Quadrant labels */}
          <Text
            x={midX / 2}
            y={abilityY / 2}
            textAnchor="middle"
            verticalAnchor="middle"
            fontWeight="bold"
          >
            Phần I
          </Text>
          <Text
            x={midX + midX / 2}
            y={abilityY / 2}
            textAnchor="middle"
            verticalAnchor="middle"
            fontWeight="bold"
          >
            Phần II
          </Text>
          <Text
            x={midX + midX / 2}
            y={abilityY + (innerHeight - abilityY) / 2}
            textAnchor="middle"
            verticalAnchor="middle"
            fontWeight="bold"
          >
            Phần III
          </Text>
          <Text
            x={midX / 2}
            y={abilityY + (innerHeight - abilityY) / 2}
            textAnchor="middle"
            verticalAnchor="middle"
            fontWeight="bold"
          >
            Phần IV
          </Text>

          {/* Axes */}
          <AxisLeft
            scale={yScale}
            left={0}
            label="Item Difficulty (logits)"
            labelProps={{
              fontSize: 20,
              textAnchor: 'middle',
              dy: -30,
              dx: -40,
            }}
          />

          {/* Horizontal line at student ability */}
          <Line
            from={{ x: 0, y: abilityY }}
            to={{ x: innerWidth, y: abilityY }}
            stroke="#666"
            strokeWidth={1}
            strokeDasharray="4,4"
          />
          {/* <Text
            x={-10}
            y={abilityY}
            textAnchor="end"
            verticalAnchor="middle"
            fontSize={15}
            fill="#666"
          >
            {`θ = ${data.ability.toFixed(2)}`}
          </Text> */}

          {/* Vertical dividing line */}
          <Line
            from={{ x: midX, y: 0 }}
            to={{ x: midX, y: innerHeight }}
            stroke="#666"
            strokeWidth={1}
          />

          {/* Top labels */}
          <Text x={midX / 2} y={10} textAnchor="middle" fontSize={20}>
            Trả lời sai
          </Text>
          <Text x={midX + midX / 2} y={10} textAnchor="middle" fontSize={20}>
            Trả lời đúng
          </Text>

          {/* Items in each quadrant */}
          {quadrantI.map((item) => (
            <g
              key={`q1-${item.id}`}
              style={{ cursor: 'pointer' }}
              onMouseOver={(e) => handleMouseOver(e, item)}
              onMouseLeave={hideTooltip}
            >
              <circle
                cx={item.x}
                cy={item.y}
                r={15}
                fill="#e6f7ff"
                stroke="#0066cc"
                strokeWidth={1}
              />
              <Text
                pointerEvents="none" // 👈 prevents it from stealing hover
                x={item.x}
                y={item.y}
                textAnchor="middle"
                verticalAnchor="middle"
                fontSize={10}
                fontWeight="bold"
              >
                {item.id}
              </Text>
            </g>
          ))}

          {quadrantII.map((item) => (
            <g
              key={`q2-${item.id}`}
              style={{ cursor: 'pointer' }}
              onMouseOver={(e) => handleMouseOver(e, item)}
              onMouseLeave={hideTooltip}
            >
              <circle
                cx={item.x}
                cy={item.y}
                r={15}
                fill="#fff9e6"
                stroke="#e6b800"
                strokeWidth={1}
              />
              <Text
                pointerEvents="none"
                x={item.x}
                y={item.y}
                textAnchor="middle"
                verticalAnchor="middle"
                fontSize={10}
                fontWeight="bold"
              >
                {item.id}
              </Text>
            </g>
          ))}

          {quadrantIII.map((item) => (
            <g
              key={`q3-${item.id}`}
              style={{ cursor: 'pointer' }}
              onMouseOver={(e) => handleMouseOver(e, item)}
              onMouseLeave={hideTooltip}
            >
              <circle
                cx={item.x}
                cy={item.y}
                r={15}
                fill="#e6f7ff"
                stroke="#0066cc"
                strokeWidth={1}
              />
              <Text
                pointerEvents="none" // 👈 prevents it from stealing hover
                x={item.x}
                y={item.y}
                textAnchor="middle"
                verticalAnchor="middle"
                fontSize={10}
                fontWeight="bold"
              >
                {item.id}
              </Text>
            </g>
          ))}

          {quadrantIV.map((item) => (
            <g
              key={`q4-${item.id}`}
              style={{ cursor: 'pointer' }}
              onMouseOver={(e) => handleMouseOver(e, item)}
              onMouseLeave={hideTooltip}
            >
              <circle
                style={{ cursor: 'pointer' }}
                cx={item.x}
                cy={item.y}
                r={15}
                fill="#fff9e6"
                stroke="#e6b800"
                strokeWidth={1}
              />
              <Text
                pointerEvents="none" // 👈 prevents it from stealing hover
                x={item.x}
                y={item.y}
                textAnchor="middle"
                verticalAnchor="middle"
                fontSize={10}
                fontWeight="bold"
              >
                {item.id}
              </Text>
            </g>
          ))}

          {/* Legend */}
          <g transform={`translate(${innerWidth - 120}, ${innerHeight - 70})`}>
            <rect
              x={0}
              y={0}
              width={120}
              height={70}
              fill="white"
              stroke="#ddd"
            />

            <circle cx={15} cy={20} r={10} fill="#e6f7ff" stroke="#0066cc" />
            <Text x={35} y={20} verticalAnchor="middle" fontSize={10}>
              Mong đợi (I, III)
            </Text>

            <circle cx={15} cy={50} r={10} fill="#fff9e6" stroke="#e6b800" />
            <Text x={35} y={50} verticalAnchor="middle" fontSize={10}>
              Bất ngờ (II, IV)
            </Text>
          </g>
        </Group>
      </svg>
      {tooltipData && (
        <Tooltip
          top={(tooltipTop ?? 0) + 12}
          left={(tooltipLeft ?? 0) + 12}
          className={cn(
            'pointer-events-none z-50 max-w-xs rounded-lg border border-muted bg-white/95 px-4 py-3 text-sm text-gray-800 shadow-xl backdrop-blur-md transition-all duration-150 ease-in-out'
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">
                Câu hỏi số{' '}
                <span className="text-primary">{tooltipData.id}</span>
              </h4>
              <Badge
                variant={tooltipData.correct ? 'success' : 'destructive'}
                className="h-5 text-[10px]"
              >
                {tooltipData.correct ? 'Đúng' : 'Sai'}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Độ khó:</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={cn(
                    'h-full rounded-full',
                    tooltipData.difficulty < data.ability - 1
                      ? 'bg-green-500'
                      : tooltipData.difficulty < data.ability + 1
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  )}
                  style={{
                    width: `${((tooltipData.difficulty - yDomain[0]) / (yDomain[1] - yDomain[0])) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700">
                {tooltipData.difficulty.toFixed(2)}
              </span>
            </div>

            {/* Quadrant information */}
            {tooltipData.quadrant && (
              <div
                className={cn(
                  'mt-2 rounded-md border-l-4 p-2 text-xs',
                  getQuadrantColor(tooltipData.quadrant)
                )}
              >
                <div className="font-medium">
                  {
                    getQuadrantInfo(
                      tooltipData.quadrant,
                      tooltipData.difficulty,
                      tooltipData.correct,
                      tooltipData.expected
                    ).title
                  }
                </div>
                <div className="mt-1 text-gray-600">
                  {
                    getQuadrantInfo(
                      tooltipData.quadrant,
                      tooltipData.difficulty,
                      tooltipData.correct,
                      tooltipData.expected
                    ).description
                  }
                </div>
                <div className="mt-1 text-gray-600">
                  {
                    getQuadrantInfo(
                      tooltipData.quadrant,
                      tooltipData.difficulty,
                      tooltipData.correct,
                      tooltipData.expected
                    ).expectation
                  }
                </div>
                <div className="mt-1 flex items-start gap-1">
                  <InfoIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
                  <span className="font-medium text-gray-700">
                    {
                      getQuadrantInfo(
                        tooltipData.quadrant,
                        tooltipData.difficulty,
                        tooltipData.correct,
                        tooltipData.expected
                      ).suggestion
                    }
                  </span>
                </div>
              </div>
            )}

            <div className="mt-1 text-[10px] text-gray-500">
              {tooltipData.expected ? 'Mong đợi' : 'Bất ngờ'}
            </div>
          </div>
        </Tooltip>
      )}
    </>
  )
}
