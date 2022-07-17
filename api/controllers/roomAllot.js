import RoomAllotment from "../models/RoomAllotment.js";



export const updateRoomAllotment = async (req, res, next) => {
  try {

    console.log("I AM IN ROOM REQUEST");
    console.log(req.body);
    const newRequest = new RoomAllotment({
      ...req.body,
    });

    await newRequest.save();
    res.status(200).send("Request has been created.");
  } catch (err) {
    next(err);
  }
};
