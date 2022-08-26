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

  export const updateDefaulter = async (req,res,next)=>{
    try {
  
      console.log("BBBBBBBBBB ",req.params.id);
      const updatedDefaulter = await Defaulter.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedDefaulter);
    } catch (err) {
      next(err);
    }
  }

  export const deleteDefaulterEntry = async (req,res,next)=>{
    try {
      await Defaulter.findByIdAndDelete(req.params.id);
      res.status(200).json("Defaulter has been deleted.");
    } catch (err) {
      next(err);
    }
  }