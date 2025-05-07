import {
  AbilityCategory,
  AbilityCategoryText,
  CronbachAlphaCategory,
  CronbachAlphaCategoryText,
  DifficultyCategory,
  DifficultyCategoryText,
  DiscriminationCategory,
  DiscriminationCategoryText,
  FitStatCategory,
  FitStatCategoryText,
  MENU_ITEM,
  ReliabilityCategory,
  ReliabilityCategoryText,
  RpbisCategory,
  RpbisCategoryText,
} from '@/constants'
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
      ? 'Độ p.cách'
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

type StatType =
  | 'discrimination'
  | 'difficulty'
  | 'rpbis'
  | 'infit'
  | 'outfit'
  | 'cronbachAlpha'
  | 'ability'
  | 'reliability'

export function evaluateStatCategory(type: StatType, value: number) {
  switch (type) {
    case 'discrimination':
      if (value < 0.1) return DiscriminationCategory.Low
      if (value < 0.3) return DiscriminationCategory.Average
      return DiscriminationCategory.High

    case 'difficulty':
      if (value < 0.25) return DifficultyCategory.VeryEasy
      if (value < 0.5) return DifficultyCategory.Easy
      if (value < 0.75) return DifficultyCategory.Difficult
      return DifficultyCategory.VeryDifficult

    case 'rpbis':
      if (value < 0.4) return RpbisCategory.Low
      if (value < 0.6) return RpbisCategory.Average
      if (value < 0.8) return RpbisCategory.High
      return RpbisCategory.VeryHigh

    case 'infit':
    case 'outfit':
      if (value < 0.77) return FitStatCategory.TooLow
      if (value > 1.33) return FitStatCategory.TooHigh
      return FitStatCategory.Acceptable

    case 'cronbachAlpha':
      if (value < 0.5) return CronbachAlphaCategory.Unacceptable
      if (value < 0.6) return CronbachAlphaCategory.Poor
      if (value < 0.7) return CronbachAlphaCategory.Questionable
      if (value < 0.8) return CronbachAlphaCategory.Acceptable
      if (value < 0.9) return CronbachAlphaCategory.Good
      return CronbachAlphaCategory.Excellent

    case 'ability':
      if (value < -2) return AbilityCategory.ExtremelyLow
      if (value < -0.5) return AbilityCategory.BelowAverage
      if (value < 0.5) return AbilityCategory.Normal
      if (value < 2) return AbilityCategory.AboveAverage
      return AbilityCategory.ExtremelyHigh
    case 'reliability':
      if (value < 0.6) return ReliabilityCategory.VeryLow
      if (value < 0.7) return ReliabilityCategory.Low
      if (value < 0.8) return ReliabilityCategory.Moderate
      if (value < 0.9) return ReliabilityCategory.High
      return ReliabilityCategory.VeryHigh
  }
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

export enum FitLabelEnum {
  Fit = 'fit',
  NotFit = 'not-fit',
  Considerable = 'considerable',
}

export const FitLabelText: Record<
  FitLabelEnum,
  { label: string; evaluation: string }
> = {
  [FitLabelEnum.Fit]: {
    label: 'Phù hợp',
    evaluation: 'Rất tốt để đánh giá năng lực thí sinh.',
  },
  [FitLabelEnum.Considerable]: {
    label: 'Cần xem xét',
    evaluation: 'Có thể sử dụng nhưng cần cải thiện để tăng hiệu quả đánh giá.',
  },
  [FitLabelEnum.NotFit]: {
    label: 'Không phù hợp',
    evaluation: 'Không hiệu quả trong đánh giá, cần xem xét lại.',
  },
}

export type CTTItemStat = {
  discrimination: number
  difficulty: number
  rpbis: number
}

export const evaluateDifficultyCategory = (
  difficulty: number
): DifficultyCategory =>
  evaluateStatCategory('difficulty', difficulty) as DifficultyCategory
export const evaluateDiscriminationCategory = (
  discrimination: number
): DiscriminationCategory =>
  evaluateStatCategory(
    'discrimination',
    discrimination
  ) as DiscriminationCategory
export const evaluateRpbisCategory = (rpbis: number): RpbisCategory =>
  evaluateStatCategory('rpbis', rpbis) as RpbisCategory
export const evaluateReliabilityCategory = (
  reliability: number
): ReliabilityCategory =>
  evaluateStatCategory('reliability', reliability) as ReliabilityCategory
export const evaluateAbilityCategory = (ability: number): AbilityCategory =>
  evaluateStatCategory('ability', ability) as AbilityCategory
export const _evaluateCronbachAlphaCategory = (
  cronbachAlpha: number
): CronbachAlphaCategory =>
  evaluateStatCategory('cronbachAlpha', cronbachAlpha) as CronbachAlphaCategory
export const evaluateInfit = (value: number): FitStatCategory =>
  evaluateStatCategory('infit', value) as FitStatCategory
export const evaluateOutfit = (value: number): FitStatCategory =>
  evaluateStatCategory('outfit', value) as FitStatCategory

export function evaluateCTTItemFit(stat: CTTItemStat): {
  fit: FitLabelEnum
  violatedCategories: Array<
    DiscriminationCategory | DifficultyCategory | RpbisCategory
  >
} {
  const discriminationCategory = evaluateDiscriminationCategory(
    stat.discrimination
  )
  const difficultyCategory = evaluateDifficultyCategory(stat.difficulty)
  const rpbisCategory = evaluateRpbisCategory(stat.rpbis)

  const discriminationGood = [
    DiscriminationCategory.Average,
    DiscriminationCategory.High,
  ].includes(discriminationCategory)

  const difficultyGood = [
    DifficultyCategory.Easy,
    DifficultyCategory.Difficult,
  ].includes(difficultyCategory)

  const rpbisGood = [
    RpbisCategory.Average,
    RpbisCategory.High,
    RpbisCategory.VeryHigh,
  ].includes(rpbisCategory)

  const fitScore = [discriminationGood, difficultyGood, rpbisGood].filter(
    Boolean
  ).length

  const violatedCategories: Array<
    DiscriminationCategory | DifficultyCategory | RpbisCategory
  > = []
  if (!discriminationGood) violatedCategories.push(discriminationCategory)
  if (!difficultyGood) violatedCategories.push(difficultyCategory)
  if (!rpbisGood) violatedCategories.push(rpbisCategory)
  let fit: FitLabelEnum
  if (fitScore === 3) {
    fit = FitLabelEnum.Fit
  } else if (fitScore === 0) {
    fit = FitLabelEnum.NotFit
  } else {
    fit = FitLabelEnum.Considerable
  }

  return { fit, violatedCategories }
}

export type RaschItemStat = {
  infit: number
  outfit: number
  ability: number
  reliability: number
}

export function evaluateRaschItemFit(stat: RaschItemStat): {
  fit: FitLabelEnum
  violatedCategories: Array<
    ReliabilityCategory | AbilityCategory | FitStatCategory
  >
} {
  const infitCategory = evaluateInfit(stat.infit)
  const outfitCategory = evaluateOutfit(stat.outfit)
  const abilityCategory = evaluateAbilityCategory(stat.ability)
  const reliabilityCategory = evaluateReliabilityCategory(stat.reliability)

  const infitGood = infitCategory === FitStatCategory.Acceptable
  const outfitGood = outfitCategory === FitStatCategory.Acceptable

  const abilityGood = [
    AbilityCategory.Normal,
    AbilityCategory.AboveAverage,
    AbilityCategory.ExtremelyHigh,
  ].includes(abilityCategory)

  const reliabilityGood = [
    ReliabilityCategory.Moderate,
    ReliabilityCategory.High,
    ReliabilityCategory.VeryHigh,
  ].includes(reliabilityCategory)

  const fitScore = [infitGood, outfitGood, abilityGood, reliabilityGood].filter(
    Boolean
  ).length

  const violatedCategories: Array<
    ReliabilityCategory | AbilityCategory | FitStatCategory
  > = []
  if (!infitGood) violatedCategories.push(infitCategory)
  if (!abilityGood) violatedCategories.push(abilityCategory)
  if (!reliabilityGood) violatedCategories.push(reliabilityCategory)

  let fit: FitLabelEnum
  if (fitScore === 4) {
    fit = FitLabelEnum.Fit
  } else if (fitScore === 0) {
    fit = FitLabelEnum.NotFit
  } else {
    fit = FitLabelEnum.Considerable
  }

  return { fit, violatedCategories }
}

export type CategoryText =
  | typeof DiscriminationCategoryText
  | typeof DifficultyCategoryText
  | typeof FitStatCategoryText
  | typeof AbilityCategoryText
  | typeof ReliabilityCategoryText
  | typeof RpbisCategoryText
  | typeof CronbachAlphaCategoryText

export function getCategoryText<T extends string>(
  category: T,
  textMap: Record<T, { label: string; evaluation: string; color: string }>
): { label: string; evaluation: string; color: string } {
  return textMap[category]
}
