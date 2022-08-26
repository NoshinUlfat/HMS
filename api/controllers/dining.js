import DiningManager from "../models/DiningManager.js";
import Meal from "../models/Meal.js";
import MealItem from "../models/MealItem.js";
import Memo from "../models/Memo.js";
import Student from "../models/Student.js";

export const createMemo = async (req, res, next) => {
  try {
    const newMemo = new Memo({
      ...req.body,
    });
    const savedMemo = await newMemo.save();
    res.status(200).json(savedMemo);
  } catch (err) {
    next(err);
  }
};

export const getAllMemo = async (req, res, next) => {
  try {
    const memos = await Memo.find().populate("studentsId");
    res.status(200).json(memos);
  } catch (err) {
    next(err);
  }
};

export const createDiningManager = async (req, res, next) => {
    const studentId = req.body.studentId;
  
    try {
      const student = await Student.findOne({ studentId: studentId });
      if (student) {
        const {studentId,...rest} = req.body;
        const newDiningManger = new DiningManager({...rest,studentsId:student._id});
        const saveManager = await newDiningManger.save();
        res.status(200).json(saveManager);
      } else {
        res.status(404).json("Student not found");
      }
    } catch (err) {
      next(err);
    }
  };

  export const checkManager = async (req, res, next) => {
    const studentId = req.params.studentId;
  
    try {
      const dingingMnager = await DiningManager.findOne({ studentsId: studentId });
      if (dingingMnager) {
        res.status(200).json({isManager:true});
      } else {
        res.status(200).send({isManager:false});
      }
    } catch (err) {
      next(err);
    }
  };

  export const setMeal = async (req, res, next) => {
    const {meal,mealItems} = req.body;
    const ameal = new Meal(meal);
  
    try {
        const savedMeal = await ameal.save();
        mealItems.map(async (item,index)=>{
            const {...rest} = item;
            const newItem = new MealItem({...rest,mealId:savedMeal._id});
            const savedItem = await newItem.save();

        })
        res.status(200).json({meal:savedMeal});

    } catch (err) {
      next(err);
    }
  };

  export const getAllMeal = async (req, res, next) => {
    try {
      const mealItems = await MealItem.find().populate('mealId');
      res.status(200).json(mealItems);
    } catch (err) {
      next(err);
    }
  };