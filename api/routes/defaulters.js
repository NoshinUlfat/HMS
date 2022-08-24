import express from "express";
import {
    createDefaulter,
    getDefaulters,
} from "../controllers/defaulter.js";

const router = express.Router();

router.post("/defaulterEntry", createDefaulter)
router.get("/", getDefaulters);

export default router;
