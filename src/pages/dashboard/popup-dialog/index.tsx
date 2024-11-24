import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
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
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
const formSchema = z.object({
  projectName: z.string().min(1).max(255),
  numberOfChoices: z.coerce.number().gte(1).lte(10),
  numberOfGroup: z.coerce.number().gte(1).lte(10),
  groupPercentage: z.coerce.number().gte(0).lte(1),
  correlationRpbis: z.string(),
})

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      numberOfChoices: 1,
      numberOfGroup: 1,
      groupPercentage: 1,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Upload</DialogTitle>
        {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
      </DialogHeader>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
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
                      <SelectItem value={option.value}>
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
          <Button type="submit" className="w-full bg-primary-600-base">
            Submit
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}
