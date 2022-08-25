import RoomAllotment from "../models/RoomAllotment.js";
import Student from "../models/Student.js";



// export const updateRoomAllotment = async (req, res, next) => {
//   const newRequest = new RoomAllotment({
//     ...req.body,
//   });

//   await newRequest.save();
//   try {
//     await Student.findByIdAndUpdate(req.params.studentsId, {
//       $push: { roomRequests: newRequest.id},
//     });
//     console.log("I AM IN ROOM REQUEST");
//     console.log(req.body)
    
//     res.status(200).send("Request has been created.");
//   } catch (err) {
//     next(err);
//   }
// };
export const updateApprovalStatus = async (req,res,next)=>{
  try {

    console.log("STATUS req id ",req.params.id);
    const updatedStatus = await RoomAllotment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).sort({date:-1});
    res.status(200).json(updatedStatus);
  } catch (err) {
    next(err);
  }
}
export const createRoomAllotment = async (req, res, next) => {
  try {

    console.log("I AM IN ROOM REQUEST");
    console.log(req.body)
    const newRequest = new RoomAllotment({
      ...req.body,
    });

    await newRequest.save();
    res.status(200).send("Request has been created.");
  } catch (err) {
    next(err);
  }
};
export const getRequestDetails = async (req,res,next)=>{
  try {
    const roomRequest = await RoomAllotment.findById(req.params.id);
    //const roomRequest = await RoomAllotment.findOne({ _id: req.body._id });
    res.status(200).json(roomRequest);
  } catch (err) {
    next(err);
  }
}
export const getRoomRequests = async (req,res,next)=>{
  try {
    const requests = await RoomAllotment.find().populate('studentsId');
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
}

export const deleteRoomRequests = async (req, res, next) => {
  try {
    await RoomAllotment.findByIdAndDelete(req.params.id);
    res.status(200).json("Room request has been deleted.");
  } catch (err) {
    next(err);
  }
};
