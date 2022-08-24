import express from "express";
import {
    createDueEntry,
} from "../controllers/due.js";

const router = express.Router();

router.post("/dueEntry", createDueEntry)


export default router;
