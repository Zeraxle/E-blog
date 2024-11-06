

export const socketService = (io, socket) => {
    const userId = socket.handshake.query.userId
    socket.join(userId)

    socket.on('disconnect', () => {
        console.log('User disconnected:', userId)
    })
}

// export const socketService = (io, socket) => {
//     socket.on('message', (msg) => {
//         io.emit('message', msg)
//     })
//     socket.on('disconnect:', () => {
//         console.log('User disconnected:', socket.id)
// })
// }