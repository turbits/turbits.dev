import Image from "./image.model.mjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      default: null,
      maxlength: [24, "Username must be less than 24 characters"],
    },
    hash: {
      type: String,
      require: true,
      default: null,
    },
    salt: {
      type: String,
      require: true,
      default: null,
    },
    avatar: {
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
    },
    administrator: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
