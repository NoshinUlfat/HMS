import Provost from "../models/Provost.js";

export const updateProvost = async (req,res,next)=>{
  try {

    //console.log("BBBBBBBBBB ",req.params.id);
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
export const deleteProvost = async (req,res,next)=>{
  try {
    await Provost.findByIdAndDelete(req.params.id);
    res.status(200).json("Provost has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getProvost = async (req,res,next)=>{
  try {
    const srovost = await Provost.findById(req.params.id);
    res.status(200).json(srovost);
  } catch (err) {
    next(err);
  }
}
export const getProvosts = async (req,res,next)=>{
  try {
    const srovosts = await Provost.find();
    res.status(200).json(srovosts);
  } catch (err) {
    next(err);
  }
}