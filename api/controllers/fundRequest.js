import Student from "../models/Student.js";
import FundRequest from "../models/FundRequest.js";

export const createFundRequest = async (req, res, next) => {
    try {
      const newFundRequest = new FundRequest({
        ...req.body,
      });
  
      const savedFundRequest = await newFundRequest.save();
      res.status(200).json(savedFundRequest);
    } catch (err) {
      next(err);
    }
  };

  export const getAllFundRequests = async (req, res, next) => {
    try {
      const fundRequests = await FundRequest.find().populate('studentsId');
      res.status(200).json(fundRequests);
    } catch (err) {
      next(err);
    }
  };