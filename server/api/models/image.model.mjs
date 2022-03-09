import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default { Image: ImageSchema };
