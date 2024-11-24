import { ItemData } from '@/types/response_data.type'
import { TableData } from '@/types/table_data.type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const transformData = (data: ItemData) => {
  const excludeKeys = ['question', 'p_value', 'rpbis', 'difficulty']
  return Object.entries(data)
    .filter(([key, _]) => !excludeKeys.includes(key))
    .map(([key, value]): TableData => {
      return {
        label: key,
        ...value,
      }
    })
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: 'accurate' | 'normal'
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytes')
      : (sizes[i] ?? 'Bytes')
  }`
}
