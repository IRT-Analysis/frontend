import { BadgeProps } from '@/components/ui/badge'
import { ChartBar, History, Home, ListOrdered, User, Users } from 'lucide-react'

export const MENU_ITEM = [
  {
    title: 'Trang chủ',
    url: '/',
    icon: Home,
    value: 'home',
    isVisible: true,
  },
  {
    title: 'Phân tích',
    url: '/analysis/:analysisType/:projectId',
    icon: ChartBar,
    value: 'analysis',
    isVisible: true,
    children: [
      {
        title: 'Thí sinh',
        url: '/students',
        icon: Users,
        value: 'students',
        isVisible: true,
      },
      {
        title: 'Câu hỏi',
        url: '/items',
        icon: ListOrdered,
        value: 'items',
        isVisible: true,
      },
    ],
  },
  {
    title: 'Lịch sử',
    url: '/history',
    icon: History,
    value: 'history',
    isVisible: true,
  },
  {
    title: 'Hướng dẫn',
    url: '/tutorial',
    icon: User,
    value: 'tutorial',
    isVisible: true,
    comingSoon: true,
  },
]

export enum Answers {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export enum DiscriminationCategory {
  Low = 'discrimination-low',
  Average = 'discrimination-average',
  High = 'discrimination-high',
}

export enum DifficultyCategory {
  VeryEasy = 'diff-very-easy',
  Easy = 'diff-easy',
  Difficult = 'diff-difficult',
  VeryDifficult = 'diff-very-difficult',
}

export enum InfitStatCategory {
  TooLow = 'fit-too-low',
  Acceptable = 'fit-acceptable',
  TooHigh = 'fit-too-high',
}
export enum OutfitStatCategory {
  TooLow = 'fit-too-low',
  Acceptable = 'fit-acceptable',
  TooHigh = 'fit-too-high',
}

export enum AbilityCategory {
  ExtremelyLow = 'ability-extremely-low',
  BelowAverage = 'ability-below-average',
  Normal = 'ability-normal',
  AboveAverage = 'ability-above-average',
  ExtremelyHigh = 'ability-extremely-high',
}

export enum ReliabilityCategory {
  VeryLow = 'reliability-very-low',
  Low = 'reliability-low',
  Moderate = 'reliability-moderate',
  High = 'reliability-high',
  VeryHigh = 'reliability-very-high',
}

export enum RpbisCategory {
  Low = 'rpbis-low',
  Average = 'rpbis-average',
  High = 'rpbis-high',
  VeryHigh = 'rpbis-very-high',
}

export enum CronbachAlphaCategory {
  Unacceptable = 'cronbach-unacceptable',
  Poor = 'cronbach-poor',
  Questionable = 'cronbach-questionable',
  Acceptable = 'cronbach-acceptable',
  Good = 'cronbach-good',
  Excellent = 'cronbach-excellent',
}

export type CategoryMap = {
  label: string
  evaluation: string
  color: string
  variant?: BadgeProps['variant']
}

export const DiscriminationCategoryText: Record<
  DiscriminationCategory,
  CategoryMap
> = {
  [DiscriminationCategory.Low]: {
    label: 'Thấp',
    variant: 'veryHard',
    color: 'var(--bad-text)',
    evaluation:
      'Câu hỏi này không phân biệt rõ giữa thí sinh giỏi và yếu. Nên xem xét cải thiện để tăng khả năng đánh giá năng lực.',
  },
  [DiscriminationCategory.Average]: {
    label: 'Trung bình',
    color: 'var(--average-text)',
    variant: 'hard',
    evaluation:
      'Câu hỏi này phân biệt ở mức trung bình. Có thể chấp nhận được nhưng vẫn còn có thể cải thiện.',
  },
  [DiscriminationCategory.High]: {
    label: 'Cao',
    variant: 'medium',
    color: 'var(--good-text)',
    evaluation:
      'Câu hỏi này phân biệt rõ ràng giữa thí sinh giỏi và yếu, rất phù hợp để đánh giá năng lực.',
  },
}

export const DifficultyCategoryText: Record<DifficultyCategory, CategoryMap> = {
  [DifficultyCategory.VeryEasy]: {
    label: 'Rất dễ',
    color: 'var(--very-bad-text)',
    variant: 'veryEasy',
    evaluation:
      'Chỉ một số ít thí sinh có thể trả lời đúng. Phù hợp để thử thách thí sinh giỏi, nhưng không đánh giá được năng lực của phần lớn thí sinh.',
  },
  [DifficultyCategory.Easy]: {
    label: 'Dễ',
    color: 'var(--good-text)',
    variant: 'easy',
    evaluation:
      'Phần lớn thí sinh không trả lời đúng. Phù hợp để phân biệt rõ ràng giữa thí sinh yếu và giỏi.',
  },
  [DifficultyCategory.Difficult]: {
    label: 'Khó',
    color: 'var(--good-text)',
    variant: 'hard',
    evaluation:
      'Đa số thí sinh có thể trả lời đúng. Phù hợp để kiểm tra kiến thức cơ bản cho thí sinh.',
  },
  [DifficultyCategory.VeryDifficult]: {
    label: 'Rất khó',
    color: 'var(--very-bad-text)',
    variant: 'veryHard',
    evaluation:
      'Hầu hết thí sinh đều trả lời đúng. Phù hợp cho các câu hỏi khởi động nhưng không hiệu quả trong việc đánh giá hoặc phân biệt năng lực.',
  },
}

export const InfitStatCategoryText: Record<InfitStatCategory, CategoryMap> = {
  [InfitStatCategory.TooLow]: {
    label: 'Quá thấp',
    color: 'var(--very-bad-text)',
    evaluation:
      'Giá trị quá thấp so với ngưỡng chấp nhận, cho thấy mức độ phù hợp yếu.',
  },
  [InfitStatCategory.Acceptable]: {
    label: 'Chấp nhận được',
    color: 'var(--very-good-text)',
    evaluation:
      'Giá trị nằm trong khoảng chấp nhận được, có thể sử dụng trong đánh giá.',
  },
  [InfitStatCategory.TooHigh]: {
    label: 'Quá cao',
    color: 'var(--very-bad-text)',
    evaluation:
      'Giá trị vượt quá giới hạn lý tưởng, cần xem xét kỹ hơn để đánh giá.',
  },
}
export const OutfitStatCategoryText: Record<OutfitStatCategory, CategoryMap> = {
  [OutfitStatCategory.TooLow]: {
    label: 'Quá thấp',
    color: 'var(--very-bad-text)',
    evaluation:
      'Giá trị quá thấp so với ngưỡng chấp nhận, cho thấy mức độ phù hợp yếu.',
  },
  [OutfitStatCategory.Acceptable]: {
    label: 'Chấp nhận được',
    color: 'var(--very-good-text)',
    evaluation:
      'Giá trị nằm trong khoảng chấp nhận được, có thể sử dụng trong đánh giá.',
  },
  [OutfitStatCategory.TooHigh]: {
    label: 'Quá cao',
    color: 'var(--very-bad-text)',
    evaluation:
      'Giá trị vượt quá giới hạn lý tưởng, cần xem xét kỹ hơn để đánh giá.',
  },
}

export const AbilityCategoryText: Record<AbilityCategory, CategoryMap> = {
  [AbilityCategory.ExtremelyLow]: {
    label: 'Năng lực rất yếu',
    color: 'var(--very-bad-text)',
    evaluation: 'Học sinh có khả năng làm bài rất thấp, cần hỗ trợ nhiều hơn.',
  },
  [AbilityCategory.BelowAverage]: {
    label: 'Dưới trung bình',
    color: 'var(--bad-text)',
    evaluation: 'Học sinh ở mức dưới trung bình, cần cải thiện thêm.',
  },
  [AbilityCategory.Normal]: {
    label: 'Trung bình',
    color: 'var(--average-text)',
    evaluation:
      'Học sinh có năng lực trung bình, phù hợp với phần lớn chương trình học.',
  },
  [AbilityCategory.AboveAverage]: {
    label: 'Trên trung bình',
    color: 'var(--good-text)',
    evaluation: 'Học sinh có năng lực khá, hiểu bài tốt.',
  },
  [AbilityCategory.ExtremelyHigh]: {
    label: 'Năng lực rất tốt',
    color: 'var(--very-good-text)',
    evaluation: 'Học sinh xuất sắc, có khả năng vượt trội.',
  },
}

export const ReliabilityCategoryText: Record<ReliabilityCategory, CategoryMap> =
  {
    [ReliabilityCategory.VeryLow]: {
      label: 'Rất thấp',
      color: 'var(--very-bad-text)',
      evaluation: 'Độ tin cậy rất kém, bài kiểm tra không ổn định.',
    },
    [ReliabilityCategory.Low]: {
      label: 'Thấp',
      color: 'var(--bad-text)',
      evaluation:
        'Cần cải thiện độ tin cậy, có thể do thiết kế câu hỏi chưa tốt.',
    },
    [ReliabilityCategory.Moderate]: {
      label: 'Trung bình',
      color: 'var(--average-text)',
      evaluation: 'Mức độ tin cậy tạm chấp nhận được.',
    },
    [ReliabilityCategory.High]: {
      label: 'Cao',
      color: 'var(--good-text)',
      evaluation: 'Bài kiểm tra đáng tin cậy.',
    },
    [ReliabilityCategory.VeryHigh]: {
      label: 'Rất cao',
      color: 'var(--very-good-text)',
      evaluation: 'Bài kiểm tra rất ổn định và nhất quán.',
    },
  }

export const RpbisCategoryText: Record<RpbisCategory, CategoryMap> = {
  [RpbisCategory.Low]: {
    label: 'Thấp',
    color: 'var(--bad-text)',
    evaluation:
      'Chỉ số này cho thấy độ tương quan kém. Thí sinh điểm cao sẽ có khả năng trả lời đúng thấp, và ngược lại. Cần được xem xét cải thiện',
  },
  [RpbisCategory.Average]: {
    label: 'Trung bình',
    color: 'var(--average-text)',
    evaluation:
      'Chỉ số này cho thấy độ tương quan trung bình. Thí sinh điểm cao sẽ khả năng trả lời đúng trung bình, và ngược lại.',
  },
  [RpbisCategory.High]: {
    label: 'Cao',
    color: 'var(--good-text)',
    evaluation:
      'Chỉ số này cho thấy độ tương quan tốt. Thí sinh điểm cao sẽ có khả năng trả lời đúng cao, và ngược lại.',
  },
  [RpbisCategory.VeryHigh]: {
    label: 'Rất cao',
    color: 'var(--very-good-text)',
    evaluation:
      'Chỉ số này cho thấy độ tương quan rất tốt. Thí sinh điểm cao sẽ có khả năng trả lời đúng rất cao, và ngược lại.',
  },
}

export const CronbachAlphaCategoryText: Record<
  CronbachAlphaCategory,
  CategoryMap
> = {
  [CronbachAlphaCategory.Unacceptable]: {
    label: 'Không chấp nhận được',
    color: 'var(--very-bad-text)',
    evaluation: 'Hệ số quá thấp, không nên sử dụng bài kiểm tra này.',
  },
  [CronbachAlphaCategory.Poor]: {
    label: 'Yếu',
    color: 'var(--bad-text)',
    evaluation: 'Cần cải thiện để tăng độ tin cậy.',
  },
  [CronbachAlphaCategory.Questionable]: {
    label: 'Cần xem xét',
    color: 'var(--average-text)',
    evaluation: 'Độ tin cậy chưa rõ ràng, cần đánh giá thêm.',
  },
  [CronbachAlphaCategory.Acceptable]: {
    label: 'Chấp nhận được',
    color: 'var(--average-text)',
    evaluation: 'Đủ độ tin cậy để sử dụng trong các tình huống cơ bản.',
  },
  [CronbachAlphaCategory.Good]: {
    label: 'Tốt',
    color: 'var(--good-text)',
    evaluation: 'Bài kiểm tra có độ tin cậy cao.',
  },
  [CronbachAlphaCategory.Excellent]: {
    label: 'Rất tốt',
    color: 'var(--very-good-text)',
    evaluation: 'Độ tin cậy rất cao, phù hợp với tiêu chuẩn nghiêm ngặt.',
  },
}
