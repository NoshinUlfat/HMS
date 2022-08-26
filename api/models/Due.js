import mongoose from "mongoose";

const dueSchema = mongoose.Schema({

    dueType : { type: String, required: true},
    dueAmount : { type: Number, required: true},
});

export default mongoose.model("Due", dueSchema);