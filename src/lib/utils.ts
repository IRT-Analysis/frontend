import { MENU_ITEM } from '@/constants'
import { RelevantKeys } from '@/types/ctt-analysis.type'
import { ItemData } from '@/types/response_data.type'
import { TableData } from '@/types/table_data.type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'

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

export const getStatsLabel = (
  name: RelevantKeys | 'infit' | 'outfit' | 'reliability'
) => {
  return name === 'difficulty'
    ? 'Độ khó'
    : name === 'discrimination'
      ? 'Độ phân cách'
      : name === 'r_pbis'
        ? 'R_PBIS'
        : name
}

export const getActiveMenuItem = (pathname: string) => {
  for (const item of MENU_ITEM) {
    if (matchPath(item.url, pathname)) return item
  }
  return MENU_ITEM[0]
}

const matchPath = (menuUrl: string, pathname: string): boolean => {
  const regexPattern = new RegExp(
    '^' + menuUrl.replace(/:\w+/g, '([^/]+)') + '$'
  )
  return regexPattern.test(pathname)
}

export const assignGroupFromScore = (score: number | null): number => {
  if (score === null) return 0 // ungrouped or unknown
  if (score >= 80) return 5
  if (score >= 65) return 4
  if (score >= 50) return 3
  if (score >= 35) return 2
  return 1
}

export const buildPath = (
  baseUrl: string,
  subUrl: string = '',
  params: Record<string, string>
) => {
  let full = baseUrl + subUrl
  for (const [key, value] of Object.entries(params)) {
    full = full.replace(`:${key}`, value)
  }
  return full
}

export function getViolatedIndices(item: RaschQuestionAnalysisType): {
  name: RelevantKeys | 'infit' | 'outfit' | 'reliability'
  value: number
  message: string
}[] {
  const violated: {
    name: RelevantKeys | 'infit' | 'outfit' | 'reliability'
    value: number
    message: string
  }[] = []

  if (item.infit < 0.7 || item.infit > 1.3) {
    violated.push({
      name: 'infit',
      value: item.infit,
      message: 'Giá trị infit nằm ngoài khoảng [0.7–1.3], cần xem xét.',
    })
  }

  if (item.outfit < 0.7 || item.outfit > 1.3) {
    violated.push({
      name: 'outfit',
      value: item.outfit,
      message: 'Giá trị outfit nằm ngoài khoảng [0.7–1.3], cần xem xét.',
    })
  }

  if (item.reliability < 0.6) {
    violated.push({
      name: 'reliability',
      value: item.reliability,
      message:
        'Độ tin cậy thấp dưới 0.6, cho thấy tính ổn định thấp của câu hỏi.',
    })
  }

  return violated
}
