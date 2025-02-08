import axios from 'axios'
import Cookies from 'js-cookie'

const COMMENT_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/comment'
})

export const findComment = async (id) => {
    try {
        const res = await COMMENT_INSTANCE.get(`/${id}`)
        return res.data
    } catch(error){throw error}
}

export const findCommentsByPost = async (postId) => {
    try {
        const res = await COMMENT_INSTANCE.get(`post/${postId}/comments`)
        return res.data
    } catch(error){throw error}
}

export const createComment = async (Comment, postId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const token = Cookies.get('sessionId') 
        const res = await COMMENT_INSTANCE.post(`/create/${postId}`, {Comment}, {
            headers: {Authorization : `Bearer ${token}`}
        })
        return res.data
    } catch(error){throw error}
}

export const updateComment = async (id, content) => {
    try {
        const res = await COMMENT_INSTANCE.put(`/${id}`, {content})
        return res.data
    } catch(error){throw error}
}

export const findOneComment = async (id) =>{
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