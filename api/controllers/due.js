import Due from "../models/Due.js";

export const createDueEntry = async (req, res, next) => {
    try {
  
      console.log("I AM IN DUE STATE ");
      console.log(req.body)
      const newRequest = new Due({
        ...req.body,
      });
  
      await newRequest.save();
      res.status(200).send("Request has been created.");
    } catch (err) {
      next(err);
    }
};