import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export type DataType = {
  name: keyof typeof CellRestrain
  A: number
  B: number
  C: number
  D: number
}[]

const CellRestrain = {
  'Nhóm cao': {
    first: 0.2,
    second: 0.7,
  },
  'Độ khó': {
    first: 0.2,
    second: 0.7,
  },
  rpbis: {
    first: 0.2,
    second: 0.7,
  },
  'Tỉ lệ': {
    first: 0.2,
    second: 0.7,
  },
  'Nhóm thấp': {
    first: 0.2,
    second: 0.7,
  },
  'Phân cách': {
    first: 0.2,
    second: 0.7,
  },
} as const

const CellItem = (key: keyof typeof CellRestrain, value: number) => {
  const { first, second } = CellRestrain[key]
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

export function MetricsTable({ data }: { data: DataType }) {
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
        {data.map((item) => (
          <TableRow key={item.name}>
            <TableCell className="font-medium">{item.name}</TableCell>
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
