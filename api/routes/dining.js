import express from "express";
import { checkManager, createDiningManager, getAllMeal, setMeal } from "../controllers/dining.js";

const router = express.Router();

//create
router.post("/createManager", createDiningManager);

//checkManager
router.get("/checkManager/get/:studentId",checkManager );

//setMeal
router.post("/setMeal",setMeal );

//getMeals
router.get('/getAllMeals',getAllMeal);

// //UPDATE
// router.post("/:studentId", updateRoomAllotment);

// // //GET ALL
// router.get("/", getRoomRequests);

export default router;
