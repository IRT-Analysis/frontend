import http from '@/lib/httpClient'
import { ItemData } from '@/types/response_data.type'

type UploadImageResType = {
  data: ItemData[]
  message: string
}

const uploadApiRequest = {
  upload: (formData: FormData) => {
    return http.post<UploadImageResType>('api/irt/upload', formData)
  },
}

export default uploadApiRequest
