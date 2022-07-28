import express from "express";
import {
  countByCity,
  countByType,
  createHall,
  deleteHall,
  getHall,
  getHallRooms,
  getHalls,
  updateHall,
} from "../controllers/hall.js";
import Hall from "../models/Hall.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHall);

//UPDATE
router.put("/:id", verifyAdmin, updateHall);
//DELETE
router.delete("/:id", verifyAdmin, deleteHall);
//GET

router.get("/find/:id", getHall);
//GET ALL

router.get("/", getHalls);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHallRooms);

export default router;
