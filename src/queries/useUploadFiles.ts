import { uploadService } from '@/services/uploadService'
import { useMutation } from '@tanstack/react-query'

export const useUploadFiles = () => {
  return useMutation({
    mutationKey: ['upload-files'],
    mutationFn: uploadService.uploadFiles,
  })
}
