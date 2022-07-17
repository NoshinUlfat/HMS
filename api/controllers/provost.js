import Provost from "../models/Provost.js";

export const updateProvost = async (req,res,next)=>{
  try {

    console.log("BBBBBBBBBB ",req.params.id);
    const updatedProvost = await Provost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProvost);
  } catch (err) {
    next(err);
  }
}