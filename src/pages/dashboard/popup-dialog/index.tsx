import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FileUploader } from '@/components/file-uploader'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCTTAnalyzeMutation } from '@/queries/useAnalyze'

const fileSchema = z.array(
  z
    .any()
    .refine((value) => value instanceof File, { message: 'Invalid file type' })
)
const formSchema = z.object({
  projectName: z.string().min(1).max(255),
  numberOfChoices: z.coerce.number().gte(1).lte(10),
  numberOfGroup: z.coerce.number().gte(1).lte(10),
  groupPercentage: z.coerce.number().gte(0).lte(1),
  correlationRpbis: z.string(),
  questionFile: fileSchema,
  answerFile: fileSchema,
  questionSetFile: fileSchema,
})

export type CTTAnalysisRequest = z.infer<typeof formSchema>

const correlationOptions = [
  {
    label: 'Điểm câu so với tổng điểm bài',
    value: 'item-total-correlation',
  },
  {
    label: 'Điểm câu so với tổng điểm bài (loại trừ điểm câu)',
    value: 'item-total-excluded',
  },
  {
    label: 'Điểm câu so với tổng điểm đã hiệu chỉnh (Iteman)',
    value: 'item-total-adjusted-iteman',
  },
]

export function PopupDialog() {
  const cttAnalyzeMutation = useCTTAnalyzeMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      numberOfChoices: 1,
      numberOfGroup: 5,
      groupPercentage: 0.27,
      correlationRpbis: 'item-total-correlation',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await cttAnalyzeMutation.mutateAsync(values)

    console.log(res)
  }

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Upload</DialogTitle>
        <VisuallyHidden.Root>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </VisuallyHidden.Root>
      </DialogHeader>
      <ScrollArea className="h-[600px] px-2">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-1"
          >
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Project</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên dự án" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="numberOfChoices"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Số lựa chọn</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập số lượng lựa chọn"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfGroup"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Số nhóm thí sinh</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập số lượng nhóm thí sinh"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="groupPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỷ lệ nhóm cao, nhóm thấp</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập tỉ lệ nhóm cao và nhóm thấp"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="correlationRpbis"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hệ số tương quan câu-bài</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Vui lòng chọn loại tương quan câu - bài" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {correlationOptions.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="questionFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload tập câu hỏi</FormLabel>
                  <FormControl>
                    <FileUploader
                      maxFileCount={1}
                      maxSize={4 * 1024 * 1024}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answerFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload tập kết quả</FormLabel>
                  <FormControl>
                    <FileUploader
                      maxFileCount={1}
                      maxSize={4 * 1024 * 1024}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="questionSetFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload bộ câu hỏi chung</FormLabel>
                  <FormControl>
                    <FileUploader
                      maxFileCount={1}
                      maxSize={4 * 1024 * 1024}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <UploadedFilesCard uploadedFiles={uploadedFiles} /> */}
            <DialogFooter>
              <Button type="submit" className="w-full bg-primary-600-base">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  )
}
