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

export const createComment = async (content, postId) => {
    try {
        const token = Cookies.get('sessionId') 
        const res = await COMMENT_INSTANCE.post(`/create/${postId}`, {content}, {
            headers: {Authorization : `Bearer ${token}`}
        })
        return res.data
    } catch(error){throw error}
}

export const updateComment = async (data) => {
    try {
        const res = await COMMENT_INSTANCE.put(`/${data.id}`, {data})
        return res.data
    } catch(error){throw error}
}

export const destroyComment = async (id) => {
    try {
        const res = await COMMENT_INSTANCE.delete(`/${id}`)
    } catch(error){throw error}
}