import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/user'
})

export const findUser = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await USER_INSTANCE.get(`/${id}`)
        return res.data
    } catch(error){throw error}
} 

export const findWhoUserFollows = async (userId) =>{
    // eslint-disable-next-line no-useless-catch
    try{
        const res = await USER_INSTANCE.get(`/UserFollows/${userId}`)
        return res.data
    }
    catch(error) {throw error}
}

export const findWhoFollowsUser = async (userid) =>{
    // eslint-disable-next-line no-useless-catch
    try{
        const res = await USER_INSTANCE.get(`/followsUser/${userid}`)
        return res.data
    }
    catch(error) {throw error}
}

export const findAllUsers = async () => {
    try {
        const res = await USER_INSTANCE.get('/')
        return res.data
    } catch(error){throw error}
}

export const createUser = async (data) => {
    try {
        const res = await USER_INSTANCE.post('/', data)
        return res.data
    } catch(error){throw error}
}

export const updateUser = async (data) => {
    // eslint-disable-next-line no-useless-catch
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await USER_INSTANCE.put(`/edit/user/${data.id}`, data)
        return res.data
    } catch(error){throw error}
}

export const destroyUser = async (id) => {
    try {
        const res = await USER_INSTANCE.delete(`/${id}`)
        return res.data
    } catch(error){throw error}
}


