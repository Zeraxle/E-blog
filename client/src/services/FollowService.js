import axios from 'axios'

const FOLLOW_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/follow'
})

export const findFollow = async (id) => {
    try {
        const res = await FOLLOW_INSTANCE.get(`/${id}`)
        return res.data
    } catch(error) {throw error}
}

export const findAllFollows = async () => {
    try {
        const res = await FOLLOW_INSTANCE.get('/')
        return res.data
    } catch(error) {throw error}
}

export const createFollow = async (data) => {
    try {
        const res = await FOLLOW_INSTANCE.post('/', data)
        return res.data
    } catch(error){throw error}
}

export const updateFollow = async (data) => {
    try {
        const res = await FOLLOW_INSTANCE.put(`/${data.id}`, data)
        return res.data
    } catch(error){throw error}
}

export const destroyFollow = async (id) => {
    try {
        const res = await FOLLOW_INSTANCE.delete(`/${id}`)
        return res.data
    } catch(error){throw error}
}