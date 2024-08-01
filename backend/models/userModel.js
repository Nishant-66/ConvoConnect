const mongoose = require("mongoose"); // mongoose is basically  interacting with database
const bcrypt = require("bcryptjs"); // bcrypt is used for password hashing 
// creating userschema
const userSchema = mongoose.Schema(
  { // defining the fields of the schema
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);
// logic for password matching 
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// using pre save hook so that we can hash the password before craeting a entry in database
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// creating user model
const User = mongoose.model("User", userSchema);
// exporting the user model
module.exports = User;