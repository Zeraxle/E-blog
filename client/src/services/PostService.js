import axios from 'axios'
import Cookies from 'js-cookie'

const POST_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/post'
})

export const findPostById = async (id) => {
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

export const findAllMoviePosts = async () =>{
    try{
        const res =  await POST_INSTANCE.get('/allMoviePosts')
        return res.data
    }
    catch(error){
        console.log('Error fetching All Movie Posts :', error)
        throw error
    }
}

export const findAllTvshowPosts = async () =>{
    try{
        const res =  await POST_INSTANCE.get('/allTvShowPosts')
        return res.data
    }
    catch (error){
        console.log('Error fetching all Tv-Show Posts', error)
        throw error
    }
}

export const findAllAnimePosts = async () =>{
    try{
        const res = await POST_INSTANCE.get('/allAnimePosts')
        return res.data
    }
    catch(error) {
        console.log('Error Fetching All Anime Posts', error)
        throw error
    }
}



export const findAllFollowersPosts = async (id) =>{
    try{
        const res = await POST_INSTANCE.get(`/${id}/followersPosts`)
        return res.data
    }
    catch(error){
        console.log('Error Fetching Posts By Followers', error)
        throw error
    }
}


export const createPost = async (data) => {
    try {
        const token = Cookies.get('sessionId')
        const res = await POST_INSTANCE.post('/', data, {
            headers : {Authorization : `Bearer, ${token}`}
        })
        return res.data
    } catch(error){
        console.error(error)
        throw error}
}

export const findAllCommmentsForPost = async (postid) =>{
    try{
        const res = await POST_INSTANCE.get(`/postcomments/${postid}`)
        return res.data
    }
    catch(error){
        console.log('Error fetching Post Comments ', error)
        throw error
    }
}

export const updatePost = async (data) => {
    try {
        const res = await POST_INSTANCE.put(`/${data.id}`, data)
        return res.data
    } catch(error){throw error}
}

export const destroyPost = async (id) => {
    try {
        const res = await POST_INSTANCE.delete(`/${id}`)
        return res.data
    } catch(error){throw error}
}