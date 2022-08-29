import express from "express";
import {
    createNotification, getNotifications, 
    getStdNotifications, getStdNotificationsUnseenCount,
    updateNotification
} from "../controllers/notification.js";

const router = express.Router();

router.post("/createNotification/:studentsId", createNotification)
router.get("/", getNotifications );
router.get("/:id", getStdNotifications);
router.get("/count/:id", getStdNotificationsUnseenCount);
router.put("/:id", updateNotification);

export default router;