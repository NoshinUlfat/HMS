import express from "express";
import {
    createCertificateRequest,
    getCertificatemRequests,
    deleteCertificate,
    updateCertificateApprovalStatus,
} from "../controllers/certificateRequest.js";


const router = express.Router();

router.put("/updateStatus/:id", updateCertificateApprovalStatus);
router.post("/certificateEntry/:studentId", createCertificateRequest)
//router.put("/:id", updateRoomAllotment);

//DELETE
//router.delete("/deleteRoomRequest/:id", deleteRoomRequests);

router.get("/", getCertificatemRequests);
//router.delete("/:id", verifyAdmin, deleteStudent);
router.delete("/delete/:id", deleteCertificate);
//GET ONE
//router.get("/requestDetails/:id", getRequestDetails);
// router.get("/oneStudent/:id", getStudent);
//router.get("/count/", countCertificate);

export default router;