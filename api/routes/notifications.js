import express from "express";
import {
    createNotification, getNotifications, 
    getStdNotifications, getStdNotificationsUnseenCount
} from "../controllers/notification.js";

const router = express.Router();

router.post("/createNotification/:studentsId", createNotification)
router.get("/", getNotifications );
router.get("/:id", getStdNotifications);
router.get("/count/:id", getStdNotificationsUnseenCount);

export default router;