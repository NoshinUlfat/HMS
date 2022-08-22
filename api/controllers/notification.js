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