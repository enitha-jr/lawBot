import React from 'react'
import { useNavigate } from 'react-router-dom';

function Hello() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/user')
    }

    return (
        <div className='hello'>
            Hello
            <input type='button' value='Admin Dashboard' onClick={handleSubmit} />
        </div>
    )
}

export default Hello