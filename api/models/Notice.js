import mongoose from "mongoose";

const noticeSchema = mongoose.Schema({

title: { type: String, required: true},
noticeType : { type: String, required: true},
attachments: { type: Buffer},
description: { type: String},
date: { type: Date, default: Date.now, required: true },

});

export default mongoose.model("Notice", noticeSchema);