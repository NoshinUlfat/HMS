import express from "express";
import {
    createNotification
} from "../controllers/notification.js";

const router = express.Router();

router.post("/createNotification/:studentId", createNotification)

export default router;