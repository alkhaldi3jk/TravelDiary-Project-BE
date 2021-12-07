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

  profile: {
    name: { type: String },
    slug: { type: String },
    age: { type: Number },
    image: { type: String },
    trips: { type: String },
    bio: { type: String },
    hobbies: { type: [String] },
    experience: [
      {
        title: { type: String },
        location: { type: String },
        from: { type: Date },
        to: { type: Date },
        description: { type: String },
      },
    ],
    social: {
      youtube: {
        type: String,
      },
      twitter: {},
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  trip: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
  // profile:{
  //     name:{type: String},
  //     age:{type: Number},
  //     image:{type:String}
  //   //   trips:{type: String},
  // }
});

module.exports = model("User", UserSchema);
