const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  username: { type: String },
  password: String,
  profile:{
      name:{type: String},
      age:{type: Number},
    //   trips:{type: String},
  }
});

module.exports = model("User", UserSchema);
