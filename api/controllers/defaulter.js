import Defaulter from "../models/Defaulter.js";
import Student from "../models/Student.js";


export const createDefaulter = async (req, res, next) => {
    try {
  
      console.log("I AM IN ROOM REQUEST");
      console.log(req.body)
      const newRequest = new Defaulter({
        ...req.body,
      });
  
      await newRequest.save();
      res.status(200).send("Request has been created.");
    } catch (err) {
      next(err);
    }
  };

  export const getDefaulters = async (req,res,next)=>{
    try {
      const requests = await Defaulter.find().populate('studentsId');
      res.status(200).json(requests);
    } catch (err) {
      next(err);
    }
  }