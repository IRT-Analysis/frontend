import Analysis from './pages/analysis'
import Items from './pages/analysis/items'
import RaschItems from './pages/analysis/rasch-analysis'
import Students from './pages/analysis/students'
import { ResetPasswordPage } from './pages/authorization/reset-password'
import { SignInPage } from './pages/authorization/sign-in'
import { SignUpPage } from './pages/authorization/sign-up'
import { VerifyMailPage } from './pages/authorization/verify-mail'
import DashBoard from './pages/dashboard'
import History from './pages/history'

export const mainRoutes = [
  { index: true, element: <DashBoard /> },
  { path: 'settings', element: <div>Settings</div> },
  { path: 'analysis/:projectId', element: <Analysis /> },
  { path: 'analysis/:projectId/students', element: <Students /> },
  { path: 'analysis/:projectId/items', element: <Items /> },
  { path: 'analysis/rasch/:projectId/items', element: <RaschItems /> },
  { path: 'history', element: <History /> },
]

export const authRoutes = [
  { path: 'signin', element: <SignInPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'forgot-password', element: <ResetPasswordPage /> },
  { path: 'verify-mail', element: <VerifyMailPage /> },
]
