export type Student = {
  student_id: string
  correct_count: number
  score: number
  group: number
}

export const MOCK_DATA: Student[] = Array.from({ length: 600 }, (_) => ({
  student_id: `211${Math.floor(1000 + Math.random() * 9000)}`,
  correct_count: Math.floor(5 + Math.random() * 6),
  score: Math.floor(50 + Math.random() * 51),
  group: Math.floor(1 + Math.random() * 5),
}))
