import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

title: { type: String, required: true},
description: { type: String, required: true},
seen: { type: Boolean, default: false, required: true },
date: { type: Date, default: Date.now, required: true },

});

export default mongoose.model("Notification", notificationSchema);

