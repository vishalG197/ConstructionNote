import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isManager = roles.includes('manager')
        isAdmin = roles.includes('admin')

        if (isManager) status = "manager"
        if (isAdmin) status = "admin"

        return { username, roles, status, isManager, isAdmin }
    }

    return { username: '', roles: [], isManager, isAdmin, status }
}
export default useAuth