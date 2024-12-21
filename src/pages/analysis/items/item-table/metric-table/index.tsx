import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { OptionDetails } from '@/services/analyzeService'
import { useMemo } from 'react'

export type DataType = {
  name: keyof typeof CellRestrain
  A: number
  B: number
  C: number
  D: number
}[]

const CellRestrain: Partial<
  Record<keyof OptionDetails, { label: string; first: number; second: number }>
> = {
  selected_by: {
    label: 'Số lượng',
    first: 0.2,
    second: 0.7,
  },
  top_selected: {
    label: 'Nhóm cao',
    first: 0.2,
    second: 0.7,
  },
  ratio: {
    label: 'Tỉ lệ',
    first: 0.2,
    second: 0.7,
  },
  bottom_selected: {
    label: 'Nhóm thấp',
    first: 0.2,
    second: 0.7,
  },
  discrimination: {
    label: 'Độ p.cách',
    first: 0.2,
    second: 0.7,
  },
  r_pbis: {
    label: 'r_pbis',
    first: 0.2,
    second: 0.7,
  },
} as const

const CellItem = (key: keyof OptionDetails, value: number) => {
  const { first, second } = CellRestrain[key] ?? { first: 0, second: 0 }
  let className = ''
  if (value < first || value > second) {
    className = 'text-red-500'
  } else {
    className = 'text-green-500'
  }

  return (
    <TableCell className={cn('font-semibold', className)}>{value}</TableCell>
  )
}

export function MetricsTable({
  data,
}: {
  data: Record<string, OptionDetails>
}) {
  const tranposedData = useMemo(() => {
    const statNames = Object.keys(data['0']) as (keyof OptionDetails)[] // Get all the stat names from the first option
    const result: DataType = []
    statNames.forEach((stat) => {
      const row = {
        name: stat,
        A: data['0']?.[stat] ?? null,
        B: data['1']?.[stat] ?? null,
        C: data['2']?.[stat] ?? null,
        D: data['3']?.[stat] ?? null,
      }
      result.push(row)
    })

    return result
  }, [data])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Chỉ số</TableHead>
          <TableHead>A</TableHead>
          <TableHead>B</TableHead>
          <TableHead>C</TableHead>
          <TableHead>D</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tranposedData.map((item) => (
          <TableRow key={item.name}>
            <TableCell className="font-medium">
              {CellRestrain[item.name]?.label}
            </TableCell>
            {CellItem(item.name, item.A)}
            {CellItem(item.name, item.B)}
            {CellItem(item.name, item.C)}
            {CellItem(item.name, item.D)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
