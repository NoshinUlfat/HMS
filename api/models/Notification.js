import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    studentsId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true
    },

    title: { type: String, required: true},
    description: { type: String, required: true},
    seen: { type: Boolean, default: false, required: true },
    date: { type: Date, default: Date.now },

});

export default mongoose.model("Notification", notificationSchema);