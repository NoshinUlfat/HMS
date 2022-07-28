import express from "express";
import {
  updateProvost,
  deleteProvost,
  getProvost,
  getProvosts
} from "../controllers/provost.js";
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
router.put("/:id", updateProvost);

//DELETE
//router.delete("/:id", verifyAdmin, deleteProvost);
router.delete("/:id", deleteProvost);

//GET
//router.get("/:id", verifyAdmin, getProvost);
router.get("/:id", getProvost);

//GET ALL
//router.get("/", verifyAdmin, getProvosts);
router.get("/", getProvosts);

export default router;
