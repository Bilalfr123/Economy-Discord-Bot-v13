const mongoose = require("mongoose");
const Item = new mongoose.Schema({
  name: { type: String, required: true },
  aliases: { type: Array, default: [] },
  description: String,
  cost: { type: Number, required: true },
});
const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  coins: { type: Number, default: 1000 },
  bank: { type: Number },
  inventory:[Item]
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;