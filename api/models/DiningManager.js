import mongoose from "mongoose";
 
const diningManagerSchema = mongoose.Schema({
    
    studentsId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true
    },
    start_timestamp: { type: Date, default: Date.now },
    end_timestamp: { type: Date },
 
});
 
export default mongoose.model("DiningManager", diningManagerSchema);