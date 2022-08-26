import CertificateRequest from "../models/CertificateRequest.js";

export const createCertificateRequest = async (req, res, next) => {
    try {
  
      console.log("I AM IN ROOM REQUEST");
      console.log(req.body)
      const newRequest = new CertificateRequest({
        ...req.body,
      });
  
      await newRequest.save();
      res.status(200).send("Request has been created.");
    } catch (err) {
      next(err);
    }
  };

  export const getCertificatemRequests = async (req,res,next)=>{
    try {
      const requests = await CertificateRequest.find().populate('studentsId');
      res.status(200).json(requests);
    } catch (err) {
      next(err);
    }
  }

  export const deleteCertificate = async (req,res,next)=>{
    try {
      await CertificateRequest.findByIdAndDelete(req.params.id);
      res.status(200).json("Student has been deleted.");
    } catch (err) {
      next(err);
    }
  }
  export const updateCertificateApprovalStatus = async (req,res,next)=>{
    try {
  
      console.log("STATUS req id ",req.params.id);
      const updatedStatus = await CertificateRequest.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedStatus);
    } catch (err) {
      next(err);
    }
  }