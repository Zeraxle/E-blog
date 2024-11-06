import { Router } from "express";
import { sendNotificationToUser } from "../controllers/notification.controller.js";

export const notificationRouter = Router()

notificationRouter.route('/send')
    .post(sendNotificationToUser)