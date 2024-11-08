import axios from 'axios'

const LIKE_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/like'
})

export const findLike = async (id) => {
    try {
        const res = await LIKE_INSTANCE.get(`/${id}`)
        return res.data
    } catch(error){throw error}
} 

export const findAllLikes = async () => {
    try {
        const res = await LIKE_INSTANCE.get('/')
        return res.data
    } catch(error){throw error}
}

export const createLike = async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await LIKE_INSTANCE.post('/', data)
        return res.data
    } catch(error){throw error}
}

export const destroyLike = async (userid, postid) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await LIKE_INSTANCE.delete(`/${userid}/${postid}`)
        return res.data
    } catch(error) {throw error}
}