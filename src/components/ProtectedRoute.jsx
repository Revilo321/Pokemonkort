import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

export const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Loading...</div>
  }
  if (currentUser) {
    return children
  }
  return <Navigate to={'/'} />
}
