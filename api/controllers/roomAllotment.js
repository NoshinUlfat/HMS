import RoomAllotment from "../models/RoomAllotment.js";



export const updateRoomAllotment = async (req, res, next) => {
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

export const getRoomRequests = async (req,res,next)=>{
  try {
    const requests = await RoomAllotment.find();
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
}
