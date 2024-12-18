import axios from 'axios'

const COMMENT_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/comment'
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
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await COMMENT_INSTANCE.post(`/`, data)
        return res.data
    } catch(error){throw error}
}

export const updateComment = async (id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await COMMENT_INSTANCE.put(`/${id}`, data)
        return res.data
    } catch(error){throw error}
}

export const findOneComment = async (id) =>{
    // eslint-disable-next-line no-useless-catch
    try{
        const res = await COMMENT_INSTANCE.get(`/${id}`)
        return res.data
    }catch(error){throw error}
}

export const destroyComment = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await COMMENT_INSTANCE.delete(`/delete/${id}`)
        return res.data
    } catch(error){throw error}
}