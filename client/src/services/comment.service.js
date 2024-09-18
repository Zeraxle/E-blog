import axios from 'axios'

const COMMENT_INSTANCE = axios.create({
    baseURL : 'http://localhost8000/comment'
})

export const findComment = async (id) => {
    try {
        const res = await COMMENT_INSTANCE.get(`/${id}`)
        return res.data
    } catch(error){throw error}
}

export const findAllComments = async () => {
    try {
        const res = await COMMENT_INSTANCE.get()
        return res.data
    } catch(error){throw error}
}

export const createComment = async (data) => {
    try {
        const res = await COMMENT_INSTANCE.post(`/`, data)
        return res.data
    } catch(error){throw error}
}

export const updateComment = async (data) => {
    try {
        const res = await COMMENT_INSTANCE.put(`/${data.id}`, data)
        return res.data
    } catch(error){throw error}
}

export const destroyComment = async (id) => {
    try {
        const res = await COMMENT_INSTANCE.delete(`/${id}`)
    } catch(error){throw error}
}