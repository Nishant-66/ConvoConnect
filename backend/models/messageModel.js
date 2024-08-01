const mongoose = require("mongoose"); //mongoose is basically  interacting with database
// creating messageschema
const messageSchema = mongoose.Schema(
  { //defining the field in schema
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
// creating message model
const Message = mongoose.model("Message", messageSchema);

// exporting the Message model
module.exports = Message;