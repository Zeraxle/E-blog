import { sendNotification } from "../services/notification.service.js";

export const sendNotificationToUser = (req, res) => {
    const {userId, message} = req.body
    sendNotification(req.io, message, userId)
    res.status(200).send({status: 'Notification sent'})
}