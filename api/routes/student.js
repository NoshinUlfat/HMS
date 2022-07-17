import express from "express";
import showData from "../controllers/student.js";
//import showData from "../controllers/auth.js";

const router = express.Router();

router.post("/showData", showData)
//router.post("/login", login)

export default router