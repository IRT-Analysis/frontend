import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/main-layout/index.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import './index.css'
import Analysis from './pages/analysis/index.tsx'
import { ResetPasswordPage } from './pages/authorization/reset-password.tsx'
import { SignInPage } from './pages/authorization/sign-in.tsx'
import { SignUpPage } from './pages/authorization/sign-up.tsx'
import { VerifyMailPage } from './pages/authorization/verify-mail.tsx'
import DashBoard from './pages/dashboard/index.tsx'
import Items from './pages/analysis/items/index.tsx'
import Students from './pages/analysis/students/student-table/index.tsx'

const mainRoutes = [
  { index: true, element: <DashBoard /> },
  { path: 'settings', element: <div>Settings</div> },
  {
    path: 'analysis',
    element: <Analysis />,
  },
  { path: 'analysis/students', element: <Students /> },
  { path: 'analysis/items', element: <Items /> },
  { path: 'history', element: <div>History</div> },
]

const authRoutes = [
  { path: 'signin', element: <SignInPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'forgot-password', element: <ResetPasswordPage /> },
  { path: 'verify-mail', element: <VerifyMailPage /> },
]

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
