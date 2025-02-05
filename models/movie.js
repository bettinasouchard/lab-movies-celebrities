const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: { type: Schema.Types.ObjectId, ref: "celebrity"}
  },
  {
    timestamps: true
  }
);

module.exports = model("movie", movieSchema );

