import { 
    createFundRequest, 
    getAllFundRequests,
    updateFundRequestApprovalStatus
 } from "../controllers/fundRequest.js";
import express from "express";

const router = express.Router();

// create new fund request
router.post("/create", createFundRequest);

// get all fund requests
router.get("/getAll", getAllFundRequests);

router.put("/updateStatus/:id", updateFundRequestApprovalStatus);

export default router;