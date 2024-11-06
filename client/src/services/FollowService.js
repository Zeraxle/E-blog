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

export const createFollow = async (followData) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await FOLLOW_INSTANCE.post('/', followData )
        return res.data
    } catch(error){throw error}
}

export const updateFollow = async (data) => {
    try {
        const res = await FOLLOW_INSTANCE.put(`/${data.id}`, data)
        return res.data
    } catch(error){throw error}
}

export const destroyFollow = async (id, followedId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await FOLLOW_INSTANCE.delete(`/${id}/${followedId}`)
        return res.data
    } catch(error){throw error}
}