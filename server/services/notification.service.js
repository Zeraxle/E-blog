

export const sendNotification = (io, message, userId) => {
    if (userId) {
        io.to(userId).emit('notification', message)
    } else {
        io.emit('notification', message)
    }
}