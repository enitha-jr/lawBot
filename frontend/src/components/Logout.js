import React from 'react'
import { useDispatch } from 'react-redux'
import { replace, useNavigate } from 'react-router-dom'
import { setAuth } from '../store/authSlice'

function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setAuth({}))
        navigate('/login', {replace: true})
    }

    return (
        <div>
            <input type='submit' value='Logout' onClick={handleLogout} />
        </div>
    )
}

export default Logout
