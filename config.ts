import { z } from 'zod'

const configSchema = z.object({
  VITE_API_ENDPOINT: z.string(),
})

const configProject = configSchema.safeParse({
  VITE_API_ENDPOINT: process.env.VITE_API_ENDPOINT,
})

if (!configProject.success) {
  console.error(configProject.error.errors)
  throw new Error('Invalid env config')
}

const envConfig = configProject.data
export default envConfig
