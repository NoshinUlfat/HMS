import { createFundRequest, getAllFundRequests } from "../controllers/fundRequest.js";
import express from "express";

const router = express.Router();

// create new fund request
router.post("/create", createFundRequest);

// get all fund requests
router.get("/getAll", getAllFundRequests);

export default router;