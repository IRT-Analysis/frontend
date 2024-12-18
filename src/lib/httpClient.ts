import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from 'axios'
import envConfig from '../../config'
import { normalizePath } from './utils'

/**
 * Define a response type for the API calls
 */
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

/**
 * Define a generic error response structure
 */
export interface ApiError {
  message: string
  status?: number
}

const httpClient = axios.create({
  baseURL: `${envConfig.API_ENDPOINT}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor for adding authorization headers, etc.
 */
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor for handling responses globally
 */
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized. Please log in.')
    }
    return Promise.reject(error)
  }
)
export const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: Omit<AxiosRequestConfig, 'method' | 'url'>
): Promise<ApiResponse<T>> => {
  const fullUrl = normalizePath(url)

  // Check if the data is FormData or JSON
  const body =
    options?.data instanceof FormData
      ? options.data // FormData will be handled automatically by Axios
      : options?.data
        ? JSON.stringify(options.data)
        : undefined

  // Only set Content-Type to application/json if the body is not FormData
  const baseHeaders: { [key: string]: string } =
    body instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' }

  try {
    const response: AxiosResponse<T> = await httpClient({
      url: fullUrl,
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers,
      },
      method,
      data: body,
    })

    return {
      data: response.data,
      status: response.status,
      message: 'message',
    }
  } catch (error) {
    const apiError: ApiError = {
      message: (error as AxiosError).message,
      status: (error as AxiosError).response?.status,
    }
    throw apiError
  }
}

const http = {
  get<Response>(
    url: string,
    options?: Omit<AxiosRequestConfig, 'method' | 'url'>
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<AxiosRequestConfig, 'method' | 'url'>
  ) {
    return request<Response>('POST', url, { ...options, data: body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<AxiosRequestConfig, 'method' | 'url'>
  ) {
    return request<Response>('PUT', url, { ...options, data: body })
  },

  delete<Response>(
    url: string,
    options?: Omit<AxiosRequestConfig, 'method' | 'url'>
  ) {
    return request<Response>('DELETE', url, { ...options })
  },
}
export default http
