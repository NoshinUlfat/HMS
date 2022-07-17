import express from "express";
import {
    updateRoomAllotment
} from "../controllers/roomAllot.js";


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
router.post("/:studentID", updateRoomAllotment);
//router.put("/:id", updateRoomAllotment);

//DELETE
// router.delete("/:id", verifyStudent, deleteStudent);

// //GET
// router.get("/:id", verifyStudent, getStudent);

// //GET ALL
// router.get("/", verifyAdmin, getStudents);

export default router;
