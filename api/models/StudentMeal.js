import mongoose from "mongoose";

const studentMealSchema = mongoose.Schema({

    studentsId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true
    },
    mealId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Meal",
        required : true
    },  

    mealStarus : { type: Boolean, default : true},

});

export default mongoose.model("StudentMeal", studentMealSchema);