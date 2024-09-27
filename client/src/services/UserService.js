import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/user'
})

export const findUser = async (id) => {
    try {
        const res = await USER_INSTANCE.get(`/${id}`)
        return res.data
    } catch(error){throw error}
} 

export const findAllUsers = async () => {
    try {
        const res = await USER_INSTANCE.get('/')
        return res.data
    } catch(error){throw error}
}

export const createUser = async (data) => {
    try {
        const res = await USER_INSTANCE.post('/', data)
        return res.data
    } catch(error){throw error}
}

export const updateUser = async (data) => {
    try {
        const res = await USER_INSTANCE.put(`/${data.id}`, data)
        return res.data
    } catch(error){throw error}
}

export const destroyUser = async (id) => {
    try {
        const res = await USER_INSTANCE.delete(`/${id}`)
        return res.data
    } catch(error){throw error}
}

export const logUserIn = async (user) => {
    try {
        const res = await USER_INSTANCE.post('/login', user)
        return res.data
    } catch(error){throw error}
}
