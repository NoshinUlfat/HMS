import express from "express";
import {
    getNotices,
    assignNotice
} from "../controllers/notice.js";


const router = express.Router();

router.post("/assignNotices", assignNotice)
router.get("/", getNotices );

export default router;
