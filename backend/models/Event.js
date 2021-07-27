const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  userId: String,
  location: String,
  date: { type: String },
  sport: String,
  level: String,
  age: String,
  members: Array,
  memberIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  spots: Number,
  creator: Object,
  image: {
    type: String,
    default: "https://wallpaperaccess.com/full/1337873.jpg",
  },
  eventName: String,
  description: String,
});

module.exports = model("Event", eventSchema);
