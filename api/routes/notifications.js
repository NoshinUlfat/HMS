import express from "express";
import {
    createNotification, getNotifications, getStdNotifications
} from "../controllers/notification.js";

const router = express.Router();

router.post("/createNotification/:studentsId", createNotification)
router.get("/", getNotifications );
router.get("/:id", getStdNotifications);

export default router;