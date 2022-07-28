import express from "express";
import { login, register, showData, updateStudent } from "../controllers/auth.js";
import { loginStudent, registerStudent } from "../controllers/authStudent.js";
import { loginProvost, registerProvost } from "../controllers/authProvost.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/showData", showData)
router.put("/:id", updateStudent)





router.post("/registerStudent", registerStudent)
router.post("/registerStudent", registerStudent)

export default router