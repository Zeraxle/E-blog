import axios from 'axios'

const POST_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/post'
})

export const findPost = async (id) => {
    try {
        const res = await POST_INSTANCE.get(`/${id}`)
        return res.data
    } catch(error){
        console.log('Error fetching post:', error)
        throw error 
    }
}

export const findAllPosts = async () => {
    try {
        const res = await POST_INSTANCE.get('/')
        return res.data
    } catch(error){
        console.log('Error fetching post:', error)
        throw error
    }
}

// export const createPost = async (data) => {
//     try {
//         const res = await POST_INSTANCE.post('/', data)
//         return res.data
//     } catch(error){throw error}
// }

// export const updatePost = async (data) => {
//     try {
//         const res = await POST_INSTANCE.put(`/${data.id}`, data)
//         return res.data
//     } catch(error){throw error}
// }

// export const destroyPost = async (id) => {
//     try {
//         const res = await POST_INSTANCE.delete(`/${id}`)
//         return res.data
//     } catch(error){throw error}
// }