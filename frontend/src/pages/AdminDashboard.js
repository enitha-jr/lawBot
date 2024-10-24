import { useEffect, useState } from 'react'
import authServices from '../services/authService'
import Logout from '../components/Logout'

function AdminDashboard() {
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUserData = async () => {
            const userData = await authServices.getUser()
            setUser(userData)
        }
        getUserData()
    }, [setUser])

    return (
        <div>
            <div>Name:{user.username}</div>
            <div>Role:{user.role}</div>
            <Logout />
        </div>
    )
}

export default AdminDashboard
