const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
  username: { type: String },
  password: String,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },

  // profile:{
  //     name:{type: String},
  //     age:{type: Number},
  //     image:{type:String}
  //   //   trips:{type: String},
  // }
});

module.exports = model("User", UserSchema);
