import http, { ApiResponse } from '@/lib/httpClient'

export interface UploadedFile {
  name: string
  url: string
  size: number
}

export interface UploadFileResponse {
  files: UploadedFile[]
}

export interface UploadFileOptions {
  endpoint: string
  files: File[]
  onUploadProgress?: (progress: { file: File; progress: number }) => void
}

export const uploadService = {
  async uploadFiles({
    endpoint,
    files,
    onUploadProgress,
  }: UploadFileOptions): Promise<ApiResponse<UploadFileResponse>> {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))

    return http.post<UploadFileResponse>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        if (onUploadProgress && event.total) {
          const progress = Math.round((event.loaded * 100) / event.total)
          onUploadProgress({ file: files[0], progress })
        }
      },
    })
  },
}
