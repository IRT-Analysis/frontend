import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/index.tsx'
import App from './pages/dashboard/index.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <App />,
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
