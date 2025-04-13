import Analysis from './pages/analysis'
import Students from './pages/analysis/students'
import { ResetPasswordPage } from './pages/authorization/reset-password'
import { SignInPage } from './pages/authorization/sign-in'
import { SignUpPage } from './pages/authorization/sign-up'
import { VerifyMailPage } from './pages/authorization/verify-mail'
import DashBoard from './pages/dashboard'
import History from './pages/history'
import ItemsRouter from './router/item-router'

export const mainRoutes = [
  { index: true, element: <DashBoard /> },
  { path: 'settings', element: <div>Settings</div> },
  { path: 'history', element: <History /> },

  // Dynamic routes for any analysis type (e.g. ctt, rasch)
  { path: 'analysis/:analysisType/:projectId', element: <Analysis /> },
  { path: 'analysis/:analysisType/:projectId/items', element: <ItemsRouter /> },
  { path: 'analysis/:analysisType/:projectId/students', element: <Students /> },
]

export const authRoutes = [
  { path: 'signin', element: <SignInPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'forgot-password', element: <ResetPasswordPage /> },
  { path: 'verify-mail', element: <VerifyMailPage /> },
]
