const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },

  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  // REVIEW: You shouldn't add trips  here in the user
  trip: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
  // REVIEW: Remove commented out code
  // profile:{
  //     name:{type: String},
  //     age:{type: Number},
  //     image:{type:String}
  //   //   trips:{type: String},
  // }
});

module.exports = model("User", UserSchema);
