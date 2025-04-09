'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  KidmapData,
  KidmapVisualization,
} from '@/components/kidmap/kidmap-visualization'

const getMockKidmapData = (studentId: string) => {
  const studentAbility =
    {
      S12345: 0.2448,
      S12346: 1.2,
      S12347: 1.8,
      S12348: -0.5,
      S12349: 0.8,
    }[studentId] || 0.5

  const items = Array.from({ length: 60 }, (_, i) => {
    const id = i + 1
    const difficulty = Math.random() * 6 - 3

    const probabilityCorrect =
      1 / (1 + Math.exp(-(studentAbility - difficulty)))
    const correct = Math.random() < probabilityCorrect

    return {
      id,
      difficulty,
      correct,
    }
  })

  return {
    studentId,
    ability: studentAbility,
    items,
  }
}

interface KidmapDialogProps {
  isOpen: boolean
  onClose: () => void
  studentId: string | null
}

export function KidmapDialog({
  isOpen,
  onClose,
  studentId,
}: KidmapDialogProps) {
  const [kidmapData, setKidmapData] = useState<KidmapData | null>(null)

  useEffect(() => {
    if (studentId) {
      const data = getMockKidmapData(studentId)
      setKidmapData(data)
    }
  }, [studentId])

  if (!kidmapData && studentId) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Biểu đồ KIDMAP - Thí sinh: Nguyen Van A
            {kidmapData && ` - Năng lực: ${kidmapData.ability.toFixed(2)}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {kidmapData && (
            <>
              <div className="h-[500px] w-full rounded-md border p-4">
                <KidmapVisualization data={kidmapData} />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Giải thích</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Phần I (Góc trên-trái)</h3>
                        <p className="text-sm text-muted-foreground">
                          Trả lời sai với các câu khó (b &gt; θ). Đây là kết quả
                          mong đợi.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">Phần II (Góc trên phải)</h3>
                        <p className="text-sm text-muted-foreground">
                          Trả lời đúng với các câu khó (b &gt; θ). Đây là kết
                          quả bất ngờ, có thể do đoán mò đúng.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Phần III (Góc dưới-phải)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Trả lời đúng với các câu dễ (b &lt; θ). Đây là kết quả
                          mong đợi.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">Phần IV (Góc dưới-trái)</h3>
                        <p className="text-sm text-muted-foreground">
                          Trả lời sai với các câu dễ (b &lt; θ). Đây là kết quả
                          bất ngờ, có thể do bất cẩn.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Thống kê</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-md bg-muted p-4">
                          <div className="text-sm text-muted-foreground">
                            Số phản hồi mong đợi
                          </div>
                          <div className="text-2xl font-bold">
                            {
                              kidmapData.items.filter(
                                (item) =>
                                  (item.difficulty > kidmapData.ability &&
                                    !item.correct) ||
                                  (item.difficulty < kidmapData.ability &&
                                    item.correct)
                              ).length
                            }
                          </div>
                        </div>
                        <div className="rounded-md bg-muted p-4">
                          <div className="text-sm text-muted-foreground">
                            Số phản hồi bất ngờ
                          </div>
                          <div className="text-2xl font-bold">
                            {
                              kidmapData.items.filter(
                                (item) =>
                                  (item.difficulty > kidmapData.ability &&
                                    item.correct) ||
                                  (item.difficulty < kidmapData.ability &&
                                    !item.correct)
                              ).length
                            }
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <div className="text-sm text-muted-foreground">
                          p-value (tỉ lệ phản hồi mong đợi)
                        </div>
                        <div className="text-2xl font-bold">
                          {(
                            kidmapData.items.filter(
                              (item) =>
                                (item.difficulty > kidmapData.ability &&
                                  !item.correct) ||
                                (item.difficulty < kidmapData.ability &&
                                  item.correct)
                            ).length / kidmapData.items.length
                          ).toFixed(2)}
                        </div>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <div className="text-sm text-muted-foreground">
                          Điểm Odds (log-odds của mức độ nhất quán)
                        </div>
                        <div className="text-2xl font-bold">
                          {Math.log(
                            kidmapData.items.filter(
                              (item) =>
                                (item.difficulty > kidmapData.ability &&
                                  !item.correct) ||
                                (item.difficulty < kidmapData.ability &&
                                  item.correct)
                            ).length /
                              Math.max(
                                1,
                                kidmapData.items.filter(
                                  (item) =>
                                    (item.difficulty > kidmapData.ability &&
                                      item.correct) ||
                                    (item.difficulty < kidmapData.ability &&
                                      !item.correct)
                                ).length
                              )
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
