const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  location: String,
  date: { type: Date, default: Date.now },
  time: String,
  sport: String,
  level: String,
  age: String,
  members: [],
  creator: Object,
  picture: String,
  event: String,
  description: String,
});

module.exports = model("Event", eventSchema);
