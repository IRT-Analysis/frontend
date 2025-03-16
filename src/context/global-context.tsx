import { useGetProfileQuery } from '@/queries/useAccount'
import { UserType } from '@/schema/account.schema'
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'

type UserStateType = Pick<UserType, 'email' | 'name' | 'id'>

type AnalysisStateType = {
  projectId: string
  examId?: string[]
}

interface State {
  user: UserStateType | null
  isAuthenticated: boolean
  analysis: AnalysisStateType | null
}

type Action =
  | { type: 'SIGN_IN'; payload: UserStateType }
  | { type: 'SIGN_OUT' }
  | { type: 'ANALYZE'; payload: AnalysisStateType }

const initialState: State = {
  user: null,
  isAuthenticated: false,
  analysis: null,
}

const globalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: action.payload, isAuthenticated: true }
    case 'SIGN_OUT':
      return { ...state, user: null, isAuthenticated: false, analysis: null }
    case 'ANALYZE':
      return { ...state, analysis: action.payload }
    default:
      return state
  }
}

interface GlobalContextProps {
  state: State
  dispatch: Dispatch<Action>
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState)
  const getProfileQuery = useGetProfileQuery()
  useEffect(() => {
    const checkAuth = async () => {
      if (state.isAuthenticated) return
      const { data } = getProfileQuery
      try {
        console.log(data?.data)
        if (data) {
          dispatch({
            type: 'SIGN_IN',
            payload: {
              id: data.data.id,
              email: data.data.email!,
              name: data.data.user_metadata.username,
            },
          })
        }
      } catch (error) {
        console.error(error)
        dispatch({ type: 'SIGN_OUT' }) // Unauthorized, clear user state
      }
    }
    checkAuth()
  }, [state.isAuthenticated, getProfileQuery.data])

  useEffect(() => {
    console.log('Global state:', state)
  }, [state])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
export const useGlobal = (): GlobalContextProps => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider')
  }
  return context
}
