

export const sendMessage = (req, res) => {
    const { message } = req.body
    io.emit('message', message)
    res.status(200).send({ status: 'Message sent' })
}