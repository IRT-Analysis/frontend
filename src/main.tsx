import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/main-layout/index.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { GlobalProvider } from './context/global-context.tsx'
import './index.css'

import { authRoutes, mainRoutes } from './routes.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: false,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Not Found</div>,
    children: mainRoutes,
  },
  ...authRoutes,
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <GlobalProvider>
          <RouterProvider router={router} />
        </GlobalProvider>
      </ThemeProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
