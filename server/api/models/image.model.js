const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = new Schema({
  name: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("Image", Image);
