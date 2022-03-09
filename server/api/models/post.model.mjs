import Image from "./image.model.mjs";
import mongoose from "mongoose";

const Post = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    unique: true,
  },
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
    require: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    require: false,
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

export default new mongoose.model("Post", Post);
