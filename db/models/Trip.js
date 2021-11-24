const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const { model, Schema } = require("mongoose");

const TripSchema = mongoose.Schema({
    name: { type: String },

    description: {
    type: String,
    // required: true,
  },
  title: {type: String},
  subtitle: { type: String},
  from: { type: Date },
  to: { type: Date },


  slug: String,
  image: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});


TripSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Trip", TripSchema);
