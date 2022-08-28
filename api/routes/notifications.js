import express from "express";
import {
    createNotification , getNotifications
} from "../controllers/notification.js";

const router = express.Router();

router.post("/createNotification/:studentId", createNotification)
router.get("/", getNotifications );

export default router;