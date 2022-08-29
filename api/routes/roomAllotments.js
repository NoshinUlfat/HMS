import express from "express";
import {
    createRoomAllotment,
    getRoomRequests,
    getRequestDetails,
    deleteRoomRequests,
    updateApprovalStatus,
    roomRequestProgress,
} from "../controllers/roomAllotment.js";


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

//UPDATE APPROVAL STATUS
router.put("/updateStatus/:id", updateApprovalStatus);

//CREATE NEW ROOM REQUEST
router.post("/:studentId", createRoomAllotment)
//router.put("/:id", updateRoomAllotment);

//DELETE
router.delete("/deleteRoomRequest/:id", deleteRoomRequests);
//router.delete("/delete/:roomRequestId", deleteRoomRequests);

// //GET
// router.get("/:id", verifyStudent, getStudent);

// //GET ALL
router.get("/", getRoomRequests);
//GET ONE
router.get("/requestDetails/:id", getRequestDetails);
router.get("/get/progress", roomRequestProgress);
//router.post("/requestDetails", getRequestDetails)
export default router;
