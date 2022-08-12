import mongoose from "mongoose";

const mealSchema = mongoose.Schema({

mealHour : { type: String, required: true},
mealPrice : { type: Number, required: true},
date: { type: Date, default: Date.now, required: true },
mealStarus : { type: Boolean, default : true},

});

export default mongoose.model("Meal", mealSchema);