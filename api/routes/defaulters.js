import express from "express";
import {
    createDefaulter,
    updateDefaulter,
    getDefaulters,
    deleteDefaulterEntry,
} from "../controllers/defaulter.js";

const router = express.Router();

router.post("/defaulterEntry", createDefaulter)
router.put("/:id", updateDefaulter);
router.get("/", getDefaulters);
router.delete("/deleteDefaulter/:id", deleteDefaulterEntry);

export default router;
