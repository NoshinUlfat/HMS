import mongoose from "mongoose";

const mealItemSchema = mongoose.Schema({

    mealId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Meal",
        required : true
    },    

    mealItemName : { type: String, required: true},
    mealItemAmmount : { type: Number, required: true},
    mealItemPrice : { type: Number, required: true},

});

export default mongoose.model("MealItem", mealItemSchema);