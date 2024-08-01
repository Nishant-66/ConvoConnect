const mongoose = require("mongoose"); //mongoose is basically  interacting with database
// creating chatschema
const chatModel = mongoose.Schema(
  {// defining fields in schema
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    // multiple users are there so it should be an array
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
// creating chat model
const Chat = mongoose.model("Chat", chatModel);
// exporting the chat model
module.exports = Chat;