import {
  AbilityCategory,
  AbilityCategoryText,
  CronbachAlphaCategory,
  CronbachAlphaCategoryText,
  DifficultyCategory,
  DifficultyCategoryText,
  DiscriminationCategory,
  DiscriminationCategoryText,
  InfitStatCategory,
  InfitStatCategoryText,
  MENU_ITEM,
  OutfitStatCategory,
  OutfitStatCategoryText,
  ReliabilityCategory,
  ReliabilityCategoryText,
  RpbisCategory,
  RpbisCategoryText,
} from '@/constants'
import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'
import { RelevantKeys } from '@/types/ctt-analysis.type'
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

export const getStatsLabel = (
  name: RelevantKeys | 'infit' | 'outfit' | 'reliability' | 'ability' | 'logit'
) => {
  switch (name) {
    case 'discrimination':
      return 'Độ p.cách'
    case 'difficulty':
      return 'Độ khó'
    case 'r_pbis':
      return 'R_PBIS'
    case 'infit':
      return 'Infit'
    case 'outfit':
      return 'Outfit'
    case 'reliability':
      return 'Độ tin cậy'
    case 'ability':
      return 'Năng lực'
    case 'logit':
      return 'Logit'
    default:
      return name
  }
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
      if (value < 0.77) return InfitStatCategory.TooLow
      if (value > 1.33) return InfitStatCategory.TooHigh
      return InfitStatCategory.Acceptable

    case 'outfit':
      if (value < 0.77) return OutfitStatCategory.TooLow
      if (value > 1.33) return OutfitStatCategory.TooHigh
      return OutfitStatCategory.Acceptable

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
export const evaluateInfit = (value: number): InfitStatCategory =>
  evaluateStatCategory('infit', value) as InfitStatCategory
export const evaluateOutfit = (value: number): OutfitStatCategory =>
  evaluateStatCategory('outfit', value) as OutfitStatCategory

export function evaluateCTTItemFit(stat: CTTItemStat): {
  fit: FitLabelEnum
  violatedCategories: Array<{
    name: ReturnType<typeof getStatsLabel>
    evaluation: string
  }>
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

  const violatedCategories: Array<{
    name: ReturnType<typeof getStatsLabel>
    evaluation: string
  }> = []
  if (!discriminationGood)
    violatedCategories.push({
      name: getStatsLabel('discrimination'),
      evaluation: DiscriminationCategoryText[discriminationCategory].evaluation,
    })
  if (!difficultyGood)
    violatedCategories.push({
      name: getStatsLabel('difficulty'),
      evaluation: DifficultyCategoryText[difficultyCategory].evaluation,
    })
  if (!rpbisGood)
    violatedCategories.push({
      name: getStatsLabel('r_pbis'),
      evaluation: RpbisCategoryText[rpbisCategory].evaluation,
    })
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
  difficulty: number
}

export function evaluateRaschItemFit(stat: RaschItemStat): {
  fit: FitLabelEnum
  violatedCategories: Array<{
    name: ReturnType<typeof getStatsLabel>
    evaluation: string
  }>
} {
  const infitCategory = evaluateInfit(stat.infit)
  const outfitCategory = evaluateOutfit(stat.outfit)
  const reliabilityCategory = evaluateReliabilityCategory(stat.reliability)

  const infitGood = infitCategory === InfitStatCategory.Acceptable
  const outfitGood = outfitCategory === OutfitStatCategory.Acceptable

  const reliabilityGood = [
    ReliabilityCategory.Moderate,
    ReliabilityCategory.High,
    ReliabilityCategory.VeryHigh,
  ].includes(reliabilityCategory)

  const fitScore = [infitGood, outfitGood, reliabilityGood].filter(
    Boolean
  ).length

  const violatedCategories: Array<{
    name: ReturnType<typeof getStatsLabel>
    evaluation: string
  }> = []
  if (!infitGood)
    violatedCategories.push({
      name: getStatsLabel('infit'),
      evaluation: InfitStatCategoryText[infitCategory].evaluation,
    })
  if (!reliabilityGood)
    violatedCategories.push({
      name: getStatsLabel('reliability'),
      evaluation: ReliabilityCategoryText[reliabilityCategory].evaluation,
    })
  if (!outfitGood)
    violatedCategories.push({
      name: getStatsLabel('outfit'),
      evaluation: OutfitStatCategoryText[outfitCategory].evaluation,
    })

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

export type CategoryText =
  | typeof DiscriminationCategoryText
  | typeof DifficultyCategoryText
  | typeof OutfitStatCategoryText
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
