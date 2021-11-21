const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");


const ProfileSchema = new Schema(
  {
    name: { type: String },
    slug: String,
    age: { type: Number },
    image: { type: String },
    trips: { type: String },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

ProfileSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });


module.exports = model("Profile", ProfileSchema);
