import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/index.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import './index.css'
import DashBoard from './pages/dashboard/index.tsx'
import Analysis from './pages/analysis/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: '/settings',
        element: <div>setting</div>,
      },
      {
        path: '/analysis',
        element: <Analysis />,
      },
      {
        path: '/history',
        element: <div>history</div>,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
