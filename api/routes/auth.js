import express from "express";
import { login, register, showData, updateStudent } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/showData", showData)
router.put("/:id", updateStudent)

export default router