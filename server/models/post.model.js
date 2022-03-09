const mongoose = require("mongoose");
const Schema = mongoose.Schema;

import Image from "./image.model";

const Post = new Schema({
  slug: {
    type: String,
    require: true,
    maxLength: [100, "Slug must be less than 100 characters"],
    unique: true,
  },
  title: {
    type: String,
    require: true,
    maxLength: [100, "Title must be less than 100 characters"],
  },
  author: {
    type: String,
    require: true,
    maxLength: [100, "Author must be less than 100 characters"],
  },
  body: {
    type: String,
    require: true,
    maxLength: [30000, "Body must be less than 30000 characters"],
  },
  headerImage: {
    type: Image,
    require: false,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  tags: [
    {
      type: String,
      require: false,
      maxLength: [100, "Tag must be less than 100 characters"],
    },
  ],
});

module.exports = new mongoose.model("Post", Post);
