import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ReviewQuestion } from '@/types/ctt-analysis.type'
import { HoverCard } from '@radix-ui/react-hover-card'
import { Badge } from '@/components/ui/badge'
import { getStatsLabel } from '@/lib/utils'

type ReviewQuestionsCardProps = {
  onQuestionClick?: (id: string) => void
}

export default function ReviewQuestionsCard({
  onQuestionClick,
}: ReviewQuestionsCardProps) {
  const questions: ReviewQuestion[] = [
    {
      id: 'C2',
      violatedIndices: [
        { name: 'discrimination', value: 0.2, message: 'Quá khó, xem lại' },
        { name: 'difficulty', value: 0.3, message: 'Quá khó, xem lại' },
      ],
    },
    {
      id: 'C5',
      violatedIndices: [
        { name: 'discrimination', value: 0.2, message: 'Quá khó, xem lại' },
        { name: 'difficulty', value: 0.3, message: 'Quá khó, xem lại' },
      ],
    },
  ]

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-l font-semibold">
          Câu hỏi cần xem lại
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {questions.map((question) => (
          <div
            key={question.id}
            className="group relative flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
          >
            <div className="space-y-1">
              <h3 className="font-medium">Câu hỏi {question.id}</h3>
              {question.violatedIndices.map((item) => (
                <HoverCard key={item.name}>
                  <HoverCardTrigger className="flex items-center justify-center">
                    <Badge variant="secondary" className="font-normal">
                      {getStatsLabel(item.name)} - {item.value}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>{item.message}</HoverCardContent>
                </HoverCard>
              ))}
            </div>
            <Button
              onClick={() => onQuestionClick?.(question.id)}
              variant="outline"
              className="ml-2"
            >
              Xem
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
