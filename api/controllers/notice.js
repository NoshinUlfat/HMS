import Notice from "../models/Notice.js";

export const assignNotice = async (req, res, next) => {
    try {
  
      console.log("I AM IN assign REQUEST");
      console.log(req.body)
      const newRequest = new Notice({
        ...req.body,
      });
  
      await newRequest.save();
      res.status(200).send("Request has been created.");
    } catch (err) {
      next(err);
    }
  };

export const getNotices = async (req,res,next)=>{
  try {
    const notice = await Notice.find();

    console.log("I AM IN Notice");

    res.status(200).json(notice);
   // res.status(200).send("Request has been created.");
  } catch (err) {
    next(err);
  }
}


  