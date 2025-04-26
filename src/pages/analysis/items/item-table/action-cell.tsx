import { Button } from '@/components/ui/button'
import { QuestionAnalysisType } from '@/schema/analysis.schema'
import { Row } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { QuestionDialog } from './question-dialog'

type ActionsCellProps = {
  row: Row<QuestionAnalysisType & { questionNumber: number }>
}

export const ActionsCell = ({ row }: ActionsCellProps) => {
  const [open, setOpen] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="w-9 p-0"
        onClick={() => {
          setIsDirty(true)
          setOpen(true)
        }}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
      <QuestionDialog
        open={open}
        onOpenChange={setOpen}
        row={row}
        isDirty={isDirty}
      />
    </>
  )
}
