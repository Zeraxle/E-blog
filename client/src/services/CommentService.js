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

export const createComment = async (postComments) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await COMMENT_INSTANCE.post(`/create/${postComments.postId}`, postComments)
        return res.data
    } catch(error){throw error}
}

export const updateComment = async (id, Comment) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await COMMENT_INSTANCE.put(`/${id}`, {Comment})
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