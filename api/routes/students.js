import express from "express";
import {
  updateStudent,
  deleteStudent,
  getStudent,
  getStudents,
  getStudent_byStudentID
} from "../controllers/student.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello student, you are logged in")
// })

// router.get("/checkstudent/:id", verifyStudent, (req,res,next)=>{
//   res.send("hello student, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id", updateStudent);

//DELETE
//router.delete("/:id", verifyAdmin, deleteStudent);
router.delete("/:id", deleteStudent);

//GET
//router.get("/:id", verifyAdmin, getStudent);
router.get("/:id", getStudent);

//GET ALL
//router.get("/", verifyAdmin, getStudents);
router.get("/", getStudents);
router.post("/findOne", getStudent_byStudentID)

export default router;
