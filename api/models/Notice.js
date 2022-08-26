import mongoose from "mongoose";

const noticeSchema = mongoose.Schema({

provostId: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Provost",
},

title: { type: String, required: true},
noticeType : { type: String, required: true},
description: { type: String},
date: { type: Date, default: Date.now, required: true },
file: { type: String},

});

export default mongoose.model("Notice", noticeSchema);