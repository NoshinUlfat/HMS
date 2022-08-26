import express from "express";
import { checkManager, createDiningManager, createMemo, getAllMeal, getAllMemo, setMeal } from "../controllers/dining.js";

const router = express.Router();

//create
router.post("/createManager", createDiningManager);
router.post("/createMemo", createMemo);

//checkManager
router.get("/checkManager/get/:studentId",checkManager );

//setMeal
router.post("/setMeal",setMeal );

//getMeals
router.get('/getAllMeals',getAllMeal);
router.get('/getAllMemos',getAllMemo);

// //UPDATE
// router.post("/:studentId", updateRoomAllotment);

// // //GET ALL
// router.get("/", getRoomRequests);

export default router;
