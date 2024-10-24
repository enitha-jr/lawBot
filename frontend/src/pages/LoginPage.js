import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';

import InputField from '../components/InputField'
import authServices from '../services/authService';
import { setAuth } from '../store/authSlice';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const { handleSubmit, register } = useForm();

    useEffect(() => {
        dispatch(setAuth({}))
    }, [dispatch])

    const onSubmit = async (data) => {
        setError(false)
        const response = await authServices.login(data)
        if (response) {
            dispatch(setAuth(response))
            navigate('/')
        }
        else {
            setError(true)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Username"
                    type="text"
                    registerProps={register("username")}
                />
                <InputField
                    label="Password"
                    type="password"
                    registerProps={register("password")}
                />
                {error && <div> Invalid Credentials </div>}
                <input type="submit" onSubmit={handleSubmit(onSubmit)} />
            </form>
        </div>
    )
}

export default LoginPage 