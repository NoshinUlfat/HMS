import Notification from "../models/Notification.js";
import Student from "../models/Student.js";

export const createNotification = async (req, res, next) => {
    try {
  
      console.log("I AM IN NOTIFICATION");
      console.log(req.body)
      const newRequest = new Notification({
        ...req.body,
      });
  
      await newRequest.save();
      res.status(200).send("Notification has been created.");
    } catch (err) {
      next(err);
    }
  };

  export const getNotifications = async (req,res,next)=>{
    try {
      const notification = await Notification.find().sort({date:-1});
  
      //console.log("I AM IN Notice");
  
      res.status(200).json(notification);
     // res.status(200).send("Request has been created.");
    } catch (err) {
      next(err);
    }
  }

  export const getStdNotifications = async (req,res,next)=>{
    try {
      const notification = await Notification.find({studentsId: req.params.id}).sort({date:-1});
  
      //console.log("I AM IN Notice");
  
      res.status(200).json(notification);
     // res.status(200).send("Request has been created.");
    } catch (err) {
      next(err);
    }
  }

  export const getStdNotificationsUnseenCount = async (req,res,next)=>{
    try {
      const notification = await Notification.find({studentsId: req.params.id}).find({seen: {$ne: true}}).count();
  
      //console.log("I AM IN Notice");
  
      res.status(200).json(notification);
     // res.status(200).send("Request has been created.");
    } catch (err) {
      next(err);
    }
  }

  export const updateNotification = async (req,res,next)=>{
    try {
  
      //console.log("BBBBBBBBBB ",req.params.id);
      const updatedNotification = await Notification.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedNotification);
    } catch (err) {
      next(err);
    }
  }