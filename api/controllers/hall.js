import Hall from "../models/Hall.js";
import Room from "../models/Room.js";

export const createHall = async (req, res, next) => {
  const newHall = new Hall(req.body);

  try {
    const savedHall = await newHall.save();
    res.status(200).json(savedHall);
  } catch (err) {
    next(err);
  }
};
export const updateHall = async (req, res, next) => {
  try {
    const updatedHall = await Hall.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHall);
  } catch (err) {
    next(err);
  }
};
export const deleteHall = async (req, res, next) => {
  try {
    await Hall.findByIdAndDelete(req.params.id);
    res.status(200).json("Hall has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHall = async (req, res, next) => {
  try {
    const hall = await Hall.findById(req.params.id);
    res.status(200).json(hall);
  } catch (err) {
    next(err);
  }
};
export const getHalls = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const halls = await Hall.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(halls);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hall.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hallCount = await Hall.countDocuments({ type: "hall" });
    const apartmentCount = await Hall.countDocuments({ type: "apartment" });
    const resortCount = await Hall.countDocuments({ type: "resort" });
    const villaCount = await Hall.countDocuments({ type: "villa" });
    const cabinCount = await Hall.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hall", count: hallCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHallRooms = async (req, res, next) => {
  try {
    const hall = await Hall.findById(req.params.id);
    const list = await Promise.all(
      hall.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
