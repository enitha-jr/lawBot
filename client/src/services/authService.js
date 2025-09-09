import apiInstance from "./apiService";

const login = async (data) => {
    try {
        const response = await apiInstance.post('/login', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getUser = async () => {
    try {
        const response = await apiInstance.get('/user')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const authServices = {
    login,
    getUser
}

export default authServices