const sessionStore = new Map()

export const storeToken = async (token) => {
    const sessionId = Math.random().toString(36).substring(2, 15)
    sessionStore.set(sessionId, token)
    return sessionId
}

export const getToken = async (sessionId) => {
    return sessionStore.get(sessionId)
}