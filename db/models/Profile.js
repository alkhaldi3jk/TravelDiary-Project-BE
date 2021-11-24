const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
  { timeStamps: true }
);


module.exports = mongoose.model("Profile", ProfileSchema);
